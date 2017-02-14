import React, { Component } from 'react';
import axios from 'axios';
class Description extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            repodata: null,
            graphxmin: 90,
            graphxmax: 705,
            graphymin: 50,
            graphymax: 420,
            xdata: null,
            ydata: null,
        }
    }
    componentWillMount() {
        var index = this.props.params.index
        var item = this.props.searchquerythings[index]
        axios.post('http://localhost:2000/details', { owner: item.owner.login, reponame: item.name })
            .then((res) => {
                // console.log(res.data)
                this.setState({
                    repodata: res.data,
                })
            })
            .then(() => {
                if (Math.max.apply(Math, this.state.repodata) === 0) {
                    var multipliery = 0;
                    var multiplierx = 0;

                } else {
                    var multipliery = ((this.state.graphymax - this.state.graphymin) / (Math.max.apply(Math, this.state.repodata)));
                    var multiplierx = ((this.state.graphxmax - this.state.graphxmin) / (this.state.repodata.length))
                }
                // console.log(Math.max.apply(Math, this.state.repodata))
                var array = this.state.repodata;
                var ydata = this.state.repodata.map((data) => {
                    console.log(multiplierx)
                    return (this.state.graphymax - (data * multipliery))
                })
                var xdata = this.state.repodata.map((data, i) => {
                    return (((i) * multiplierx) + this.state.graphxmin)
                })
                this.setState({
                    ydata: ydata,
                    xdata: xdata,
                    loading: false,

                })
            }
            )

    }
    render() {
        var index = this.props.params.index
        var item = this.props.searchquerythings[index]
        console.log(item)
        return (
            <div>
            <h1 className="App-intro" style={{ position: 'absolute', left: '14px', top:'-102px'}}>
                    Github Repository Stats
                </h1>
                <svg height="150" width="1300" style={{ position: 'relative', left:'-12px', top:'-33px' }}>

                    <g transform="translate(5,0) scale(.4)">
                        <rect x="0" y="0" width="10" height="250" fill="gray" />
                        <rect x="0" y="250" width="450" height="10" fill="gray" />
                        <path d="m0 200 L50 50 L100 150 L150 100 L200 150" style={{ fill: 'none', stroke: 'black', strokeWidth: '5' }} />
                        <circle cx="0" cy="200" r="8" fill="red"></circle>
                        <circle cx="50" cy="50" r="8" fill="red" />
                        <circle cx="50" cy="50" r="20" stroke="red" stroke-width="3" fill="none" />
                        <circle cx="200" cy="200" r="20" stroke="red" stroke-width="3" fill="red" />
                        <circle cx="100" cy="200" r="20" stroke="blue" stroke-width="3" fill="none" />

                        <g>
                            <circle cx="100" cy="150" r="8" fill="red" />
                            <text className="clickOn" x="80" y="170">1234</text>

                            <circle cx="150" cy="100" r="8" fill="red" />
                            <circle cx="200" cy="150" r="8" fill="red" />
                            <polygon points="320,4 400,95 270,140 223,124" width="100" height="250" style={{ fill: 'lime', stroke: 'purple', strokeWidth: '1' }} />
                        </g>
                        <path d="M 100 250 q 150 -300 300 0" stroke="blue" style={{ fill: 'none', strokeWidth: '2' }} />
                        <polyline transform="translate(300,100)" points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style={{ fill: 'white', stroke: 'red', strokeWidth: '4' }} />
                    </g>
                </svg>
                

                <div className='Repoinfo'>
                    
                    <div className='row repodetails'><div className='Repotitle'>
                       
                        </div>
                        <div className="ownerinfo col-xs-5">
                            <a target="_blank" href={item.html_url}> <img className="ownericon" src={item.owner.avatar_url} /> </a>

                            <span className="badge descriptionbadge">
                                stars: {item.stargazers_count}
                                <img src='https://cdn4.iconfinder.com/data/icons/pictograms-vol-1-1/292/star-128.png' height='10' width='10' />
                            </span>
                            <span className='badge descriptionbadge'>
                                forks: {item.forks}
                                <img src='https://cdn2.iconfinder.com/data/icons/free-mobile-icon-kit/64/Fork.png' height='10' width='10' />
                            </span>
                            <span className='badge descriptionbadge'>
                                {item.language}
                            </span>
                        </div>
                        <div className="col-xs-7" style={{left:'-287px'}}>
                            <h2>Title: {item.name}</h2>
                            <p>Description: {item.description}</p>
                            <p>Owner: {item.owner.login}</p>
                            <p>Stars: {item.stargazers_count}</p>
                            <p>URL: {item.html_url}</p>

                        </div>
                    </div>
                </div>
                {Math.max.apply(Math, this.state.repodata) !== 0 ?
                    this.state.loading ?
                        <img src='http://localhost:3000/ajax-loader.gif' />
                        :
                        <div className='svgGraph'>
                            <svg className="graph" height='800' >
                                <title id="title">A line chart showing some information</title>
                                <g className='axis y-axis'>
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmin} y1={this.state.graphymin} y2={this.state.graphymax}></line>

                                    <line x1={this.state.graphxmin} x2={this.state.graphxmin} y1={this.state.graphymin - 20} y2={this.state.graphymin}></line>
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmin + 5} y1={this.state.graphymin - 20} y2={this.state.graphymin - 10}></line>
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmin - 5} y1={this.state.graphymin - 20} y2={this.state.graphymin - 10}></line>
                                </g>
                                <g className="grid x-grid" id="xGrid">
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmax} y1={(this.state.graphymin)} y2={(this.state.graphymin)}></line>
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmax} y1={((this.state.graphymax - this.state.graphymin) / 3) + this.state.graphymin} y2={((this.state.graphymax - this.state.graphymin) / 3) + this.state.graphymin}></line>
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmax} y1={((this.state.graphymax - this.state.graphymin) * 2 / 3) + this.state.graphymin} y2={((this.state.graphymax - this.state.graphymin) * 2 / 3) + this.state.graphymin}></line>
                                </g>
                                <g className='axis x-axis'>
                                    <line x1={this.state.graphxmin} x2={this.state.graphxmax} y1={this.state.graphymax} y2={this.state.graphymax}></line>

                                    <line x1={this.state.graphxmax} x2={this.state.graphxmax + 20} y1={this.state.graphymax} y2={this.state.graphymax}></line>
                                    <line x1={this.state.graphxmax + 20} x2={this.state.graphxmax + 10} y1={this.state.graphymax} y2={this.state.graphymax + 5}></line>
                                    <line x1={this.state.graphxmax + 20} x2={this.state.graphxmax + 10} y1={this.state.graphymax} y2={this.state.graphymax - 5}></line>
                                </g>
                                <g className="grid y-grid" id="yGrid">
                                    <line x1={((this.state.graphxmax - this.state.graphxmin) / 4) + this.state.graphxmin} x2={((this.state.graphxmax - this.state.graphxmin) / 4) + this.state.graphxmin} y1={this.state.graphymin} y2={this.state.graphymax}></line>
                                    <line x1={((this.state.graphxmax - this.state.graphxmin) * 2 / 4) + this.state.graphxmin} x2={((this.state.graphxmax - this.state.graphxmin) * 2 / 4) + this.state.graphxmin} y1={this.state.graphymin} y2={this.state.graphymax}></line>
                                    <line x1={((this.state.graphxmax - this.state.graphxmin) * 3 / 4) + this.state.graphxmin} x2={((this.state.graphxmax - this.state.graphxmin) * 3 / 4) + this.state.graphxmin} y1={this.state.graphymin} y2={this.state.graphymax}></line>
                                    <line x1={((this.state.graphxmax - this.state.graphxmin) * 4 / 4) + this.state.graphxmin} x2={((this.state.graphxmax - this.state.graphxmin) * 4 / 4) + this.state.graphxmin} y1={this.state.graphymin} y2={this.state.graphymax}></line>
                                </g>
                                <g className="labels x-labels">

                                    <text x="100" y={this.state.graphymax + 20}>{this.state.repodata.length}</text>
                                    <text x={((this.state.graphxmax - this.state.graphxmin) / 4) + this.state.graphxmin} y={this.state.graphymax + 20}>{parseInt(((this.state.repodata.length) / 5) * 4)}</text>
                                    <text x={((this.state.graphxmax - this.state.graphxmin) * 2 / 4) + this.state.graphxmin} y={this.state.graphymax + 20}>{parseInt(((this.state.repodata.length) / 5) * 3)}</text>
                                    <text x={((this.state.graphxmax - this.state.graphxmin) * 3 / 4) + this.state.graphxmin} y={this.state.graphymax + 20}>{parseInt(((this.state.repodata.length) / 5) * 2)}</text>
                                    <text x={((this.state.graphxmax - this.state.graphxmin) * 4 / 4) + this.state.graphxmin} y={this.state.graphymax + 20}>0</text>
                                    <text x="400" y={this.state.graphymax + 40} className="label-title">Time(weeks ago)</text>
                                </g>
                                <g className="labels y-labels">
                                    <text x="80" y={(this.state.graphymin) + 10}>{parseInt(Math.max.apply(Math, this.state.repodata))}</text>
                                    <text x="80" y={((this.state.graphymax - this.state.graphymin) / 3) + 10 + this.state.graphymin}>{parseInt(Math.max.apply(Math, this.state.repodata) * 3 / 4)}</text>
                                    <text x="80" y={((this.state.graphymax - this.state.graphymin) * (2 / 3)) + 10 + this.state.graphymin}>{parseInt(Math.max.apply(Math, this.state.repodata) * 1 / 2)}</text>
                                    <text x="80" y={((this.state.graphymax - this.state.graphymin) * (3 / 3)) + 10 + this.state.graphymin}>0</text>
                                    <text x="50" y="200" className="label-title" transform="rotate(-90 50 200)">Commits per week</text>
                                </g>
                                <g className="data" >
                                    {this.state.xdata.map((data, i) => {
                                        //  console.log(this.state.ydata[i])
                                        return (
                                            <g>
                                                <text x={data} y={this.state.ydata[i] + 10} className="pointLabel"></text>
                                                <circle cx={data} cy={this.state.ydata[i]} data-value={i} r="3"></circle>

                                                <rect x={data} y={this.state.graphymin} width="30" height={this.state.graphymax - this.state.graphymin} fill="gray" className="lineData" />
                                                <g className="pointLabel">
                                                    <text x={data-5} y={this.state.ydata[i]-10}>{this.state.repodata[i]}</text>
                                                    <circle className="circlePoint"cx={data} cy={this.state.ydata[i]} data-value={i} r="3"></circle>
                                                </g>
                                                {i + 1 === this.state.ydata.length ? null : <line x1={data} x2={this.state.xdata[i + 1]} y1={this.state.ydata[i]} y2={this.state.ydata[i + 1]}></line>}
                                            </g>
                                        )
                                    })}
                                </g>
                                <g className="graphtitle">
                                    <text x="300" y="20"> Number of commits over time </text>
                                </g>
                            </svg>
                        </div>

                    :
                    <p> NO DATA AVAILABLE !</p>
                }



            </div>
        );
    }
}
export default Description;