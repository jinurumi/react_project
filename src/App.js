import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) {
  console.log('props',props, props.title)

  return <header>
    <h1><a href="/" onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(Number(event.target.id)); // 문자열 id가 들어오기때문에 숫자로 바꾸기
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(props){
  return <article>
    <h2>Create</h2>
      // form 태그는 submit을 했을때 페이지가 reload 됨를 방지
    <form onSubmit={event=>{
      event.preventDefault();
      // 입력된 값 가지고 오기
      const title = event.target // 이벤트에서 발생한 태그 의미
    }}> // 정보를 보낼때
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </article>
}


function App() {
  // const _mode = useState{ "WELCOME"};
  // const mode = _mode[0];
  // const setMode = _mode[1];
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const topics = [
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'javascript', body:'javascript is ...'}
  ]
  let content = null;
  if(mode === 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ'){
    let title, body = null; // 초기화
    for(let i =0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content =<Article title={title} body={body}></Article>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(title, body)=>{

    }}> </Create>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={()=>{
        setMode('WELCOME');

      }}></Header>
      <Nav topics={topics} onChangeMode={(_id)=>{
        setMode('READ');
        setId(_id);
      }}></Nav>
      {content}
      <a href="/create" onClick={event=>{
        event.preventDefault(); //클릭했을때  url이 바뀌지 않도록
        setMode('CREATE');
      }}>Create</a>
    </div>
  ); 
}

export default App;
