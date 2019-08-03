import React, { Component } from 'react';
import './HeaderComp.css';

class HeaderComp extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <header className="header-app">
               <span className="noselect">{this.props.txtHeader}</span> 
            </header>
        );
    }

}
export default HeaderComp;