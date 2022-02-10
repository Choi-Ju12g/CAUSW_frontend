import { PostModel } from '../models/PostModel';

import { API } from 'configs/axios';

class PostRepo {
  private URI = '/api/v1/posts';

  findAll = async (boardId: string, page: number): Promise<Post.FindAllResponseDto> => {
    const { data } = await API.get(`${this.URI}?boardId=${boardId}&pageNum=${page}`);

    return data;
  };

  create = async (body: Post.CreateRequestDto): Promise<PostModel> => {
    const { data } = await API.post(this.URI, body);

    return new PostModel(data);
  };

  findById = async (postId: string): Promise<PostDetail.RootObject> => {
    const { data } = await API.get(`${this.URI}/${postId}`);

    return data;
  };

  update = async (postId: string, body: Post.UpdateRequestDto): Promise<void> => {
    const { data } = await API.put(`${this.URI}/${postId}`, body);

    console.debug(data);

    // return data;
  };

  delete = async (postId: string): Promise<void> => {
    await API.delete(`${this.URI}/${postId}`);
  };
}

export const PostRepoImpl = new PostRepo();
