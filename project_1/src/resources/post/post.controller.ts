import { Router, NextFunction, Request } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/error.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './post.validation';
import PostService from './post.service';

class PostController implements Controller {
  public path = '/posts';
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create
    );
  }

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.PostService.create(title, body);

      res.status(201).json({ post });
    } catch (error) {}
    next(new HttpException(400, 'Cannot create post'));
  };
}

export default PostController;
