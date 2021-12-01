import { resolve } from 'dns';
import { action, computed, flow, makeObservable, observable, runInAction } from 'mobx';
import { runInContext } from 'vm';
import { CommentRepoImpl as Repo } from '../repositories/CommentRepo';

export enum CommentInputState {
  WRITE,
  REPLY,
  EDIT,
}

export class CommentUiStore {
  comments: Model.Comment[] = [];
  buf?: Model.Comment;
  target?: Model.Comment;
  state: CommentInputState = CommentInputState.WRITE;
  visiableMenuModal = false;
  visiableDeleteModal = false;

  constructor() {
    makeObservable(this, {
      comments: observable,
      target: observable,
      state: observable,
      visiableMenuModal: observable,
      visiableDeleteModal: observable,

      isReply: computed,
      isEdit: computed,

      setComments: action.bound,
      create: flow.bound,

      setState: action.bound,
      resetState: action.bound,
      openMenuModal: action.bound,
      closeMenuModal: action.bound,
      openDeleteModal: action.bound,
      closeDeleteModal: action.bound,
    });
  }

  get isReply(): boolean {
    return this.state === CommentInputState.REPLY;
  }

  get isEdit(): boolean {
    return this.state === CommentInputState.EDIT;
  }

  setComments(comments: Model.Comment[]): void {
    this.comments = comments;
  }

  *create(data: { postId: string; content: string }): Generator {
    const comment = (yield Repo.create({
      parentCommentId: this.isReply ? this.target?.id : undefined,
      ...data,
    })) as Model.Comment;

    this.comments.push(comment);
  }

  setState(state: CommentInputState): void {
    this.state = state;
    this.target = this.buf;
  }

  resetState(): void {
    this.state = CommentInputState.WRITE;
    this.buf = undefined;
    this.target = undefined;
  }

  openMenuModal(target: Model.Comment): void {
    this.visiableMenuModal = true;
    this.buf = target;
  }

  closeMenuModal(): void {
    this.visiableMenuModal = false;
  }

  openDeleteModal(): void {
    this.visiableDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.visiableDeleteModal = false;
  }
}
