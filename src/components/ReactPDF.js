import React from 'react';

class ReactPDF extends React.Component {
  handlePrintClick = () => {
    window.print();
  };

  render() {
    return (
        <>
        <h1>Hello</h1>
      <button onClick={this.handlePrintClick}>
        Print this page
      </button>
      </>
    );
  }
}

export default ReactPDF;