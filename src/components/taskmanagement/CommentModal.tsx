import React, { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";
import { fetchCommentHistory, postComment, formatTaskTimestamp } from "./utils";
const { TextArea } = Input;

interface Comment {
  createdTimeStamp: string;
  userName: string;
  comments: string;
}

interface CommentModalProps {
  open: boolean;
  onClose: () => void;
  currentRowData: any;
}

const CommentModal: React.FC<CommentModalProps> = ({
  open,
  onClose,
  currentRowData,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // const handleAddComment = () => {
  //   if (!newComment.trim()) return;
  //   const newEntry: Comment = {
  //     timestamp: new Date().toLocaleString(),
  //     author: 'John Doe',
  //     message: newComment,
  //   };
  //   setComments([newEntry, ...comments]);
  //   setNewComment('');

  // };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetchCommentHistory(currentRowData?.taskId);
        console.log("API Response:", response);
        if (response?.data.length > 0) {
          setComments(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, [currentRowData?.taskId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") {
      onClose();
      return; // Prevent empty comments
    }
    try {
      const response = await postComment(
        currentRowData?.taskId,
        newComment,
        "atul"
      );
      console.log("API Response:", response);
      if (response?.status === "success") {
        onClose(); // Close the modal after successful comment addition
        console.log("Comment added successfully");
      }
      // Handle success (e.g., show a success message or update the UI)
    } catch (error) {
      console.error("Failed to add comment:", error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <Modal
      title="Add Comment"
      open={open}
      onCancel={onClose}
      footer={null}
      className="commentModal"
    >
      <div className="section">
        <label className="label">Add a Comment</label>
        <TextArea
          rows={4}
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="buttonWrapper">
          <Button type="primary" onClick={handleAddComment}>
            Add Comment
          </Button>
        </div>
      </div>
      {comments && comments.length > 0 && (
        <div className="section">
          <label className="label">Comment History :</label>
          <div className="commentHistory">
            {comments?.map(
              (comment, index) =>
                comment?.comments ? ( // Check if comment?.comments is not null
                  <div className="commentItem" key={index}>
                    <div className="meta">
                      {formatTaskTimestamp(comment?.createdTimeStamp)} -{" "}
                      {comment.userName}
                    </div>
                    <div className="comments">{comment.comments}</div>
                  </div>
                ) : null // Render nothing if comment?.comments is null
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CommentModal;
