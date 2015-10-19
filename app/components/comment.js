import React from 'react';
import Showdown from 'showdown';
import '../css/comment.less';
var converter = new Showdown.Converter();

class Comment extends React.Component{

    render(){
    var rawMarkup = converter.makeHtml(this.props.children.toString());
    return(
        <div className="comment">
            <h2 className="commentAuthor">
               作者: {this.props.author}
            </h2>
            <span>留言内容:</span><span dangerouslySetInnerHTML={{__html:rawMarkup}} />
        </div>
        )
        };
}

export default Comment;