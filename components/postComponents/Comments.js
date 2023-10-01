import CommentSingle from "./CommentSingle";

const Comments = ({ comments }) => {
  return comments ? (
    comments.map((comment) => (
      <CommentSingle key={comment._id} comment={comment} />
    ))
  ) : (
    <p>Loading comments ...</p>
  );
};

export default Comments;
