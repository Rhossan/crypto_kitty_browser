import React from 'react';

class KittyIndex extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (this.props.kittyInfo != nextProps.kittyInfo) {
      debugger
      console.log('hello');
    }
  }

  render() {
    const { birthdate, genes, generation, kittyId } = this.props;
    let imageSrc = 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/'
    imageSrc += kittyId;
    imageSrc += '.svg';


    const date = new Date(birthdate * 1000);
    let locale = "en-us";
    let month = date.toLocaleString(locale, {month: "long"});
    let day = date.getDate();
    let year = date.getFullYear();

    debugger
    if (!birthdate) {
      return <div></div>;
    }

    else {return (
      <div className='container'>
        <div className='image'>
          <img
            src= {imageSrc}
            alt="Kitty Image"
            height="400px"
            width="400px"
          />
        </div>
        <div className='info'>
          <h2>Genes</h2>
          <h3>{genes}</h3>
          <h2>Generation</h2>
          <h3>{generation}</h3>
          <h2>Birth Time</h2>
          <h3>{month} {day}, {year}</h3>
        </div>
      </div>
    );}
  }
}

export default KittyIndex;
