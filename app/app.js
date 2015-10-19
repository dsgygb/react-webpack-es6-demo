
import React from 'react';
import $ from 'jquery';
import CommentBox from './components/commentBox.js';
var config = {
    baseApiUrl:"http://127.0.0.1:12121"
};

React.render(
<CommentBox postUrl={config.baseApiUrl+"/comment"} dataUrl={config.baseApiUrl+"/comments"} />,
document.getElementById('container')
);