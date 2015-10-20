import React from 'react';
import CommentForm from './commentForm.js';
import Comment from './comment.js';
import CommentList from './commentList.js';
import $ from 'jquery';
import '../css/commentBox.less';
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

                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
                <CommentList data={this.state.data} />
            </div>
        );
    };
}

export default CommentBox;