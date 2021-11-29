import { utcToZonedTime, format } from 'date-fns-tz';
import { AuthorModel } from './AuthorModel';

export class CommentModel {
  isChild: boolean;
  postId: string;
  id: string;
  author: Model.Author;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  updatable = false;
  deletable = false;
  childComments: Model.Comment[] = [];

  constructor(props: Comment.Dto, isChild = false) {
    this.isChild = isChild;
    this.postId = props.postId;
    this.id = props.id;
    this.author = new AuthorModel(props.writerAdmissionYear, props.writerName, props.writerProfileImage);
    this.content = props.content;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.updatable = props.updatable;
    this.deletable = props.deletable;
    this.childComments = props.childCommentList.map(data => new CommentModel(data, true));
  }

  get formatedCreatedAt(): string {
    const zonedDate = utcToZonedTime(this.createdAt, 'Asis/Seoul');

    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss');
  }
}
