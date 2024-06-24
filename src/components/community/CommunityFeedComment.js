import React, {useState} from 'react';
import '../../scss/components/CommunityFeedComment.scss';

const CommunityFeedComment = ({comment, depth = 0}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const replyStyle = {
        marginLeft: `${depth * 10}%`,
    };
    const shouldShowMore = comment.content.length > 100;

    const renderContent = () => {
        if (shouldShowMore && !isExpanded) {
            return (
                <>
                    {comment.content.substring(0, 100)}...
                    <span onClick={() => setIsExpanded(true)} style={{color: 'blue', cursor: 'pointer'}}>더보기</span>
                </>
            );
        }
        return comment.content;
    };
    return (
        <div style={replyStyle} className="community_feed_comment_container">
            <div className="profile_container">
                <div className="profile_picture">
                </div>
                <div className="name_container">
                    <p>작성자</p>
                </div>
                <div className="time_container">
                    <p>19시간</p>
                </div>
            </div>
            <div className='comment_container'>
                <div className="comment_content">
                    <p>
                        <p>{renderContent()}</p>
                        <span>...더보기</span>
                    </p>
                </div>
                <div className="like_container">
                    <div className="like">
                        <img className="profile_icon" src={process.env.PUBLIC_URL + '/assets/icons/like.svg'}
                             alt=''/>
                    </div>
                    <p>19</p>
                </div>
            </div>
            {comment.replies && comment.replies.map((reply) => (
                <CommunityFeedComment key={reply.id} comment={reply} depth={depth + 1}/>
            ))}
        </div>
    );
}

export default CommunityFeedComment;