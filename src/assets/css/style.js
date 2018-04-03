// import color from 'color'

const baseColor = '#bcd'
// const baseColor = '#ccb'

module.exports = {
  loading: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 50,
  },
  loadingImg: {
    width: 50,
  },
  vmName:{
    position: 'absolute',
    top: 12,
  },
  vmInformation: {

  },
  vmInformationItem: {
    listStyle: 'none',
    float:'left',
    paddingRight: 15,
  },
  vmInformationItemIcon: {
    width: 17,
    height: 17,
    // fill: '#567'
    fill: 'rgba(34,50,58,1)',
  },
  messages: {
    position: 'fixed',
    zIndex: 1000,
    left: 50,
  },
  modal: {
    display: 'block !important',
  },
  selector: {
    marginBottom: 30,
    marginTop: 25
  },
  package: {width: '100%', marginTop: '28px', fontSize: '1em', lineHeight: '37px'},
  packageTitle: {textAlign: 'left', paddingLeft: '20px'},
  packageData: {textAlign: 'right', direction: 'ltr',paddingLeft: '30px'},
  networkTableTd: {textAlign: 'center',border:'1px solid #dfdfdf'},

  footerLabel: {
    padding:10,
    width: 150,
    color: 'white',
    background:'rgba(92,192,222,1)',
    borderRadius: 5,
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  footerInfoLabel: {
    direction: 'ltr',
    color:'green',
    display:'inline-block',
    fontFamily: 'arial',
  },
  footerLabelContainer: {
    margin:7,
  },
};
