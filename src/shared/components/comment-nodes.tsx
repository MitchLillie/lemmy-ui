import { Component } from 'inferno';
import { CommentSortType, CommentNode as CommentNodeI } from '../interfaces';
import {
  CommunityModeratorView,
  UserViewSafe,
  SortType,
} from 'lemmy-js-client';
import { commentSort, commentSortSortType } from '../utils';
import { CommentNode } from './comment-node';

interface CommentNodesState {}

interface CommentNodesProps {
  nodes: CommentNodeI[];
  moderators?: CommunityModeratorView[];
  admins?: UserViewSafe[];
  postCreatorId?: number;
  noBorder?: boolean;
  noIndent?: boolean;
  viewOnly?: boolean;
  locked?: boolean;
  markable?: boolean;
  showContext?: boolean;
  showCommunity?: boolean;
  sort?: CommentSortType;
  sortType?: SortType;
  enableDownvotes: boolean;
}

export class CommentNodes extends Component<
  CommentNodesProps,
  CommentNodesState
> {
  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    return (
      <div className="comments">
        {this.sorter().map(node => (
          <CommentNode
            key={node.comment_view.comment.id}
            node={node}
            noBorder={this.props.noBorder}
            noIndent={this.props.noIndent}
            viewOnly={this.props.viewOnly}
            locked={this.props.locked}
            moderators={this.props.moderators}
            admins={this.props.admins}
            postCreatorId={this.props.postCreatorId}
            markable={this.props.markable}
            showContext={this.props.showContext}
            showCommunity={this.props.showCommunity}
            sort={this.props.sort}
            sortType={this.props.sortType}
            enableDownvotes={this.props.enableDownvotes}
          />
        ))}
      </div>
    );
  }

  sorter(): CommentNodeI[] {
    if (this.props.sort !== undefined) {
      commentSort(this.props.nodes, this.props.sort);
    } else if (this.props.sortType !== undefined) {
      commentSortSortType(this.props.nodes, this.props.sortType);
    }

    return this.props.nodes;
  }
}
