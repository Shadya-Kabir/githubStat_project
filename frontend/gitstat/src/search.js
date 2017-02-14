import React, { Component } from 'react';
import {Link} from 'react-router';
import './App.css';
import axios from 'axios';

class Search extends Component {
  constructor(){
      super();
      this.state = {
          searchquery: null,
          language: 'javascript', 
          searchqueryitems: [],
          loading: false,
      }
    this.txtFieldChange = this.txtFieldChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.setLanguageType = this.setLanguageType.bind(this);
  }
  setLanguageType(type){
  this.setState({language: type})
  // console.log('The type is: ', this.state.languageType);
  }
  formSubmit(e){
      e.preventDefault();
      // console.log(e.target.children[0])
      e.target.children[0].value = ''
      this.setState({
        searchqueryitems: [],
        loading: true,
      })
      axios
      .post('http://localhost:2000/search', {searchquery: this.state.searchquery, language:this.state.language})
      .then( (res)=>{
          // console.log(res.data);
          this.setState({
           searchqueryitems: res.data,
           loading: false
          })
          this.props.changeState(res.data)
      })
  }
  txtFieldChange(e){
      this.setState({
          searchquery: e.target.value,
      })
        // console.log('THING')
    }

  render() {
    //  console.log(this.props)
    
    var buttonarray = ['CSS', 'HTML', 'Java', 'JavaScript', 'PHP', 'Python', 'Ruby', 'React']
    return (
      <div className="Search">
        <h1 className="App-intro">
          Github Repository Stats
        </h1>
         <svg height="400" width="600">
        
          <g transform="translate(70,70)" >
            <rect x="0" y="0" width="10" height="250" fill="gray" />
            <rect x="0" y="250" width="450" height="10" fill="gray" />
            <path d="m0 200 L50 50 L100 150 L150 100 L200 150" style={{ fill: 'none', stroke: 'black', strokeWidth: '5' }} />
            <circle cx="0" cy="200" r="8" fill="red"></circle>
            <circle cx="50" cy="50" r="8" fill="red" />
            <circle cx="50" cy="50" r="20" stroke="red" stroke-width="3" fill="none" />
            <circle cx="200" cy="200" r="20" stroke="red" stroke-width="3" fill="red" />
            <circle cx="100" cy="200" r="20" stroke="blue" stroke-width="3" fill="none" />

         <g>
         <circle cx="100" cy="150" r="8" fill="red"/>
         <text className="clickOn" x="80" y="170">1234</text>
         
         <circle cx="150" cy="100" r="8" fill="red"/>
         <circle cx="200" cy="150" r="8" fill="red"/>
         <polygon points="320,4 400,95 270,140 223,124" width="100" height="250" style={{fill:'lime', stroke:'purple', strokeWidth:'1'}} />
         </g>
         <path d="M 100 250 q 150 -300 300 0" stroke="blue" style={{fill:'none', strokeWidth:'2'}}/>
        <polyline transform ="translate(300,100)" points="0,40 40,40 40,80 80,80 80,120 120,120 120,160"style={{fill:'white',stroke:'red',strokeWidth:'4'}} />
         </g>
      </svg>
        <form onSubmit={this.formSubmit}>
            <input className='searchform' onChange={this.txtFieldChange} type='text' placeholder='Search Repos!' name='searchquery' />
            <button className='btn btn-primary btn-xs'> SEARCH </button>
        </form>
        <div className="form-group" >
          {buttonarray.map((language)=>{
            return (
              <button type="button" className={this.state.language === language ? "btn btn-sm btn-success" : "btn btn-sm btn-info"} onClick={()=> this.setLanguageType(language)}>{language}</button>
              )
            
          })
        }
        </div>
        <div className='container'>
        <div className="row ">
        {this.state.loading?<img src='ajax-loader.gif' /> : null}
        {this.state.searchqueryitems.map((item, i)=>{
          return(
            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 outSetBorder">
              <Link to={`/description/${item.name}/${item.owner.login}/${i}`}>
                <div className='container_item'>
                    <h4 className="media-heading">
                        <div className="title">{item.name}</div>
                        <div className="description">{item.description}</div>
                        <span className="badge">{item.stargazers_count}
                         <img src='https://cdn4.iconfinder.com/data/icons/pictograms-vol-1-1/292/star-128.png' height='10' width='10' />
                        </span>
                       
                    </h4>
                  <div>
                    <img height='50' width='50'src={item.owner.avatar_url} />
                  </div>
                </div>
               </Link>
            </div>
          )
        })}
        </div>
        </div>
      </div>
    );
  }
}
export default Search;