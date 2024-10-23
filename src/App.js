import React, { Component } from 'react';
import News from './Component/News'; 
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      country: 'us', // Default country
      searchTerm: '', // State for search input
    };
  }

  // Handler for country selection change
  handleCountryChange = (event) => {
    this.setState({ country: event.target.value });
  };

  // Handler for search input change
  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
    console.log(this.state.country)
    
  };

  // Handler for search button click
  handleSearch = () => {
    console.log("Search term:", this.state.searchTerm);
    // Implement search logic here
  };

  render() {
    const apiKey = process.env.REACT_APP_API_KEY;
    // const apiKey = "f1cb677854e949c2b7a3ad7f952a956d";
    const pageSize = 10; // Number of articles to display per page

    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<News category="general" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/business" element={<News category="business" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/entertainment" element={<News category="entertainment" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/general" element={<News category="general" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/health" element={<News category="health" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/science" element={<News category="science" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/sports" element={<News category="sports" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
            <Route path="/technology" element={<News category="technology" pagesize={pageSize} api={apiKey} country={this.state.country} setProgress={() => { }} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
