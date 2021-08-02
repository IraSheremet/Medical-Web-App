import React, {Component} from "react";
import AuthService from "../services/auth.service";
import {Link} from "react-router-dom";

export default class ReviewCard extends Component {
    constructor(props) {
        super(props);

        this.convertTZ = this.convertTZ.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.getContent = this.getContent.bind(this);
        this.replyToReview = this.replyToReview.bind(this);

        this.state = {
            currentUser: AuthService.getCurrentUser(),
            replyToReview: false,
        };

        this.review = this.props.review;
        this.isPreview = this.props.isPreview;
        this.isReply = this.props.isReply;

        this.creationTime = this.formatTime(this.review.creationTime);
    }

    replyToReview() {
        this.setState({
            replyToReview: true
        })
    }

    convertTZ(date, tzString) {
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));
    }

    getContent(content) {
        if (this.props.isPreview && content != null && content.length > 40) {
            return content.substring(0, 110) + '...';
        }
        return content;
    }

    formatTime(creationTime) {
        var creationTimestamp = new Date(creationTime);
        let userDate = this.convertTZ(creationTimestamp, "Asia/Dhaka");
        var hours = userDate.getHours();
        var minutes = userDate.getMinutes();
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        return hours + ':' + minutes;
    }
//TODO в строке попытался добавить разделение
    render() {
        return(
            <div>
                <div className="jumbotron align-center color-light-blue">
                    <div className="row" style={{wordBreak: 'break-all'}}>
                        <Link to={"/profile/" + this.review.creator.username} style={{ textDecoration: 'none', color: 'dark-blue'}}>
                            <h6 className="fa fa-user line-break"> {this.review.creator.username}</h6>
                        </Link>
                        <h6 className="fa fa-calendar"> {new Date(this.review.creationTime).toLocaleDateString()}</h6>
                        <h6>{this.creationTime}</h6>
                    </div>

                    <div className="bottom-buffer-10"> {this.getContent(this.review.content)}</div>
                </div>
            </div>
        )
    }
}