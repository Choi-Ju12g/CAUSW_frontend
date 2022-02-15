import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';

import { usePageUiStore } from '../../PagePostDetailUiStore';
import { CommentCard } from '../Comment';
import { ReplyCommentContainer } from './ReplyCommentContainer';
import { BackLink, CommentsBox } from './styled';

import { PAGE_URL, PostParams } from '@/configs/path';
import { useRootStore } from '@/stores/RootStore';

export const PostReplyComments: React.FC = observer(() => {
  const { boardId, postId, commentId } = useParams<PostParams>();
  const { replace } = useHistory();
  const timer = useRef<NodeJS.Timeout>();
  const virtuoso = useRef(null);
  const {
    ui: { mainRef },
    replyComment: { hasMore, page, parent, comments, fetch, reset },
  } = useRootStore();
  const {
    setVirtuosoRef,
    commentInput: { resetState },
  } = usePageUiStore();

  const handleBack = useCallback(
    () => replace(generatePath(PAGE_URL.PostDetail, { boardId, postId })),
    [boardId, postId],
  );

  const loadMore = useCallback(
    (hasMore: boolean, page: number) => () => {
      if (timer.current) clearTimeout(timer.current);

      if (hasMore) {
        timer.current = setTimeout(() => {
          fetch(commentId, page + 1);
        }, 50);
      }
    },
    [postId],
  );

  useEffect(() => {
    fetch(commentId, 0);

    return () => {
      reset();
      resetState();
    };
  }, [commentId]);

  useEffect(() => {
    setVirtuosoRef(virtuoso);
  }, [parent]);

  return parent ? (
    <CommentsBox>
      <BackLink onClick={handleBack}>전체 댓글</BackLink>
      <CommentCard model={parent} />
      <Virtuoso
        ref={virtuoso}
        style={{ height: '100vh' }}
        customScrollParent={mainRef?.current as HTMLElement}
        endReached={loadMore(hasMore, page)}
        overscan={200}
        data={comments}
        itemContent={(index, comment) => <ReplyCommentContainer key={comment.id} model={comment} />}
      />
    </CommentsBox>
  ) : null;
});