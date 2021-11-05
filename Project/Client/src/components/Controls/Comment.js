
const Comment = ({ style, title, content, time, options,star, children }) => {
  const getStar = star =>{
    const arr = []
    for(let i = 0; i<star; i++)
      arr.push(i)
    return <>
      {arr.map((item,index)=><img key={index} width="20px" src="/icon/staricon.png"/>)}
    </>
  }
  return (
    <div className="Comment">
      <div className={`comment-wrapper  ${options}`} style={style}>
        <p className="comment-title" style={style && style.title}>
          {title}
          {time !== null && <span className="comment-time">{time}</span>}
        </p>
        {star && <div className="comment-star">
          {getStar(star)}
        </div>}
        <p className="comment-content" style={style && style.content}>
          {content}
        </p>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Comment;

/** Using Comment
 * style: override your style
 *
 * title: title of the comment will be show on top
 *
 * content: the content of the comment
 *
 * time: it is the option, you can use to show time or anithing
 *
 * options: left: the commnent will show in the left of the parent
 *          right: the comment will show in the right of the parent
 *          shadow: show shadow of the comment
 *          /you can use multiple options/
 *
 * You can add more component in the before end of the comment
 *  */
