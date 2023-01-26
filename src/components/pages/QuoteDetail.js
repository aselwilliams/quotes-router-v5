import React from 'react';
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useEffect } from 'react';
import HighlightedQuote from '../quotes/HighlightedQuote';
import {getSingleQuote} from '../lib/api';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';

// const DUMMY_QUOTES = [
//   {id:'q1', author: 'Max', text: 'Learning React is fun!'},
//   {id:'q2', author: 'Unknown', text: 'Nothing is impossible for a willing heart'},
//   {id:'q3', author: 'Unknown', text: 'Happy wife, happy life.'},
// ]

const QuoteDetail = () => {

    const params = useParams()
    const match = useRouteMatch()
    console.log(match,'match')
    // {isExact: false
    // params: {quoteId: 'q2'}
    // path: "/quotes/:quoteId"
    // url: "/quotes/q2"}
    
    const {sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote,true)

    useEffect(()=> {
      const {quoteId} = params;
      console.log(quoteId,'id in details')
      sendRequest(quoteId)
    }, [sendRequest])

    if(status==='pending'){
      return <div className="centered">
        <LoadingSpinner />
      </div>
    }

    if(error){
      return <p className="centered">{error}</p>
    }

    if(!loadedQuote.text){
      return <p>No quote found!</p>
    }

  return (
    <section>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        <Route path={match.path} exact>
          <div className="centered">
            <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
          </div>
        </Route>
        {/* <Route path='/quotes/:quoteId/comments'>    Alternative, esp if it was NOT a link*/}
        <Route path={`${match.path}/comments`}>  
          <Comments />
        </Route>
    </section>
  )
}

export default QuoteDetail;