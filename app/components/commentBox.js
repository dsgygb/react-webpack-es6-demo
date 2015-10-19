import React from 'react';
import CommentForm from './commentForm.js';
import Comment from './comment.js';
import CommentList from './commentList.js';
import $ from 'jquery';
class CommentBox extends React.Component{


    constructor (props){
        super(props);
        this.state = {
            data:[]
        };
        this.loadComments();

    }

    handleCommentSubmit(comment){
        var comments = this.state.data;
        var newComments = [comment].concat(comments);
        this.setState({data: newComments});

        $.ajax({
            url: this.props.postUrl,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                //todo 什么也不做吗?
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    };
    loadComments(){
        $.ajax(
            {
                url:this.props.dataUrl,
                dataType:'json',
                success:function(data){
                    this.setState({data:data.reverse()})
                }.bind(this),
                error:function(xhr,status,err){
                    console.error(this.props.url,status,err.toString())
                }.bind(this)
            }
        )
    };

    render() {
        return (
            <div className="commentBox">
                <h1>评论表单</h1>
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
                <h1>评论列表</h1>
                <CommentList data={this.state.data} />
            </div>
        );
    };
}

export default CommentBox;