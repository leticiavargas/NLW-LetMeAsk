
import '../styles/question.scss';

const Question = ({content, author, children, isHighLighted = false, isAnswered = false}) => {
  return (
    <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highlighted' : ''}`}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}

export { Question }