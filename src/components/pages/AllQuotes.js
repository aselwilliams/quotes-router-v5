import React, {useEffect} from 'react';
import QuoteList from '../quotes/QuoteList';
import {getAllQuotes} from '../lib/api';
import useHttp from '../hooks/use-http';
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound';

// const DUMMY_QUOTES = [
//     {id:'q1', author: 'Max', text: 'Learning React is fun!'},
//     {id:'q2', author: 'Unknown', text: 'Nothing is impossible for a willing heart'},
//     {id:'q3', author: 'Unknown', text: 'Happy wife, happy life.'},
// ]
const AllQuotes = () => {
    const {sendRequest, status, data:loadedQuotes, error} = useHttp(getAllQuotes, true);

    useEffect(()=> {
        sendRequest();
    }, [sendRequest])

    if(status==='pending'){
        return (
            <div className='centered'>
                <LoadingSpinner />
            </div>
        )
    }

    if(error){
        return (
            <p className="centered focused">{error}</p>
        )
    }

    if(status==='completed' && (!loadedQuotes || loadedQuotes.length===0)){
        return <NoQuotesFound />
    }
  return (
    <QuoteList quotes={loadedQuotes} />
  )
}

export default AllQuotes