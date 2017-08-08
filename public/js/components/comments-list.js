import {
    get
} from '../fetch';

export default function (comment) {
    var outputComments = [];

    return outputComments = comment.map((posted) => {
        return (`<span class="username">${posted.author}</span>

        <p class="comment">${posted.content}</p>
`)
    }).join('')




}
