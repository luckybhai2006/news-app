import React, { Component } from 'react';
import Newsitem from './Newsitem';
import './newsitem.css';
import Spinner from './Spinners';
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from './Navbar';

class News extends Component {
   constructor() {
      super();
      this.state = {
         page: 1,
         articles: [],
         totalResults: 0,
         loading: false,
         searchTerm: '',
         noResults: false,
      };
   }

   handleSearch = async () => {
      if (this.state.searchTerm.trim() === "") {
         console.error('Search term is empty');
         return;
      }

      this.props.setProgress(30);
      const apiKey = process.env.REACT_APP_API_KEY;

      // Use the country and search term in the search API URL
      const { country } = this.props;
      const url = `http://192.168.1.41:5000/api/search?query=${this.state.searchTerm}&country=${country}&apiKey=${apiKey}`;

      this.setState({ loading: true });

      try {
         const data = await fetch(url);
         const parsedata = await data.json();

         if (!parsedata.articles || parsedata.articles.length === 0) {
            this.setState({ noResults: true, articles: [], totalResults: 0 });
         } else {
            this.setState({ noResults: false, articles: parsedata.articles, totalResults: parsedata.totalResults });
         }
      } catch (error) {
         console.error('Error fetching search results:', error);
         this.setState({ noResults: true, articles: [], totalResults: 0 });
      } finally {
         this.setState({ loading: false });
         this.props.setProgress(100);
      }
   };

   async newsupdate() {
      this.props.setProgress(80);
      const { country, category } = this.props;
      const { page } = this.state;

      // Include the country parameter in the news API URL
      const url = `http://192.168.1.41:5000/api/news?country=${country}&category=${category}&page=${page}`;

      console.log("Fetching URL: ", url);  // Log the URL to check it

      this.setState({ loading: true });

      try {
         const data = await fetch(url);
         const parsedata = await data.json();

         if (!parsedata.articles) throw new Error('No articles found');

         this.setState({
            articles: parsedata.articles,
            totalResults: parsedata.totalResults,
         });
      } catch (error) {
         console.error('Error fetching news:', error);
         this.setState({ articles: [], totalResults: 0 });
      } finally {
         this.setState({ loading: false });
         this.props.setProgress(100);
      }
   }

   componentDidMount() {
      this.newsupdate();
   }

   componentDidUpdate(prevProps) {
      if (prevProps.category !== this.props.category || prevProps.country !== this.props.country) {
         // Reset the page and articles when the category or country changes
         this.setState({ page: 1, articles: [] }, this.newsupdate);
      }
   }

   fetchMoreData = async () => {
      const { category, country } = this.props;
      const { page, articles } = this.state;

      // Update the API URL to include the country parameter
      const url = `http://192.168.1.41:5000/api/news?country=${country}&category=${category}&page=${page + 1}`;

      this.setState({ page: page + 1, loading: true });

      try {
         const data = await fetch(url);
         const parsedata = await data.json();

         if (!parsedata.articles) throw new Error('No articles found');

         this.setState({
            articles: articles.concat(parsedata.articles),
            totalResults: parsedata.totalResults,
         });
      } catch (error) {
         console.error('Error fetching more data:', error);
      } finally {
         this.setState({ loading: false });
      }
   }

   handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         event.preventDefault();
         this.handleSearch();
      }
   };

   handleInputChange = (event) => {
      this.setState({ searchTerm: event.target.value });
   };

   render() {
      const { articles, loading, noResults } = this.state;

      return (
         <>
            <Navbar 
               handleKeyDown={this.handleKeyDown} 
               handleInputChange={this.handleInputChange} 
               handleSearch={this.handleSearch} 
               searchTerm={this.state.searchTerm} 
            />

            <h1 className='text-center' style={{ marginTop: '115px' }}>
               <u><strong>NewsMonkey - Top Headlines from {this.props.category} category</strong></u>
            </h1>

            {loading && <Spinner />}

            <InfiniteScroll
               dataLength={articles.length}
               next={this.fetchMoreData}
               hasMore={articles.length < this.state.totalResults}
               loader={loading ? <Spinner /> : null}
            >
               <div className="container">
                  <div className="row">
                     {articles.length === 0 && !loading && noResults && (
                        <p className="warning"><u>No results available.</u></p>
                     )}

                     <div className="container">
                        <div className="row">
                           {articles.map((element, index) => (
                              <div key={index} className="col-md-2 col-12"> {/* col-12 for full width on mobile */}
                                 <Newsitem
                                    imageUrl={element.urlToImage}
                                    title={element.title ? element.title.slice(0, 50) : ''}  // Fixed typo: 'tytle' to 'title'
                                    des={element.description ? element.description.slice(0, 100) : ''}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                 />
                                 <br />
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </InfiniteScroll>
         </>
      );
   }
}

export default News;
