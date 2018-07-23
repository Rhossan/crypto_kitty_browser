import React from 'react';

class KittyIndex extends React.Component {

  render() {
    const { birthdate, genes, generation, kittyId, idBool } = this.props;
    // kitty image - is stored on the web server -
    // storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/123123.svg
    // where 0x06012c8cf97bead5deae237070f9587f8e7a266d is ethereum address for CryptoKittiesCore
    // and 123123 is kittyId
    let imageSrc = 'https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/'

    let image = '';
    if(idBool){
      imageSrc += kittyId
      imageSrc += '.svg';
      image = (
        <img
          src= {imageSrc}
          alt="kitty"
          height="400px"
          width="400px"
        />
      )
    } else {
      image = (<p></p>);
    }



    // birthTime - convert unix epoch time
    const date = new Date(birthdate * 1000);
    let locale = "en-us";
    let month = date.toLocaleString(locale, {month: "long"});
    let day = date.getDate();
    let year = date.getFullYear();

    if (!idBool) {
      return <div></div>;
    }

    else {return (
      <div className='container'>
        <div className='image'>
          {image}
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
