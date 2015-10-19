import React from 'react';
import '../css/commentForm';
class CommentForm extends React.Component{

    handleSubmit(e){
    e.preventDefault();

    var author= this.refs.author.getDOMNode().value.trim();
    var text= this.refs.text.getDOMNode().value.trim();

    if(!text|| !author){
        return;
    }

    this.props.onCommentSubmit({author:author,text:text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
}

    render(){
        return (
            <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="姓名" ref="author" />
                <textarea type="text" placeholder="留言内容" ref="text" >
                </textarea>
                <button type="submit">发送留言</button>
            </form>
        );
    }


}

export default CommentForm;