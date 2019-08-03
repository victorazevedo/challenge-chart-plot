import React, { Component } from 'react';
import './DragBtn.css';

class DragBtn extends Component {
    render() {
        return (
            <div className="drag-icon">
                <div className="ico">
                    <div className="line1"></div>
                    <div className="line2"></div>
                </div>
            </div>
        );
    }
}
export default DragBtn;