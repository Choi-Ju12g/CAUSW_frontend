import { MouseEventHandler, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { useRootStore } from '@/stores/RootStore';
import { MenuIcon } from '@/components/atoms/Icon';
import { ClearButton } from '@/components/atoms/clear';
import { MenuBox, MenuButton, RightButtonWrapper } from '@/components/header/styled';
import { useOutsideVisiable } from '@/hooks/useOutsideVisiable';

export const ContextMenu = observer(() => {
  const {
    post: { post },
  } = useRootStore();
  const ref = useRef(null);
  const [visiable, setVisiable] = useOutsideVisiable(ref);
  const toggle = useCallback(() => setVisiable(state => !state), [setVisiable]);

  if (!post) {
    return null;
  }

  return post.updatable || post.deletable ? (
    <div ref={ref}>
      <Wrapper onClick={toggle}>
        <MenuIcon className="absolute-center" />
        <span className="a11y-hidden">메뉴</span>
      </Wrapper>
      <MenuBox visiable={visiable}>
        {post.updatable ? <MenuButton>게시글 수정</MenuButton> : null}
        {post.deletable ? <MenuButton>게시글 삭제</MenuButton> : null}
      </MenuBox>
    </div>
  ) : null;
});

const Wrapper = styled(ClearButton)<{ onClick: MouseEventHandler<HTMLButtonElement> }>`
  ${RightButtonWrapper}
`;