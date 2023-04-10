
function Loader() {
  return (
    <div className="loading-container text-center">
      <img src="../../images/web_pics/loading.gif" className="loading" />
      <style jsx>
        {
          `
       
            .loading {
              height: 200px !important;
              width: auto;
            }
          
          `
        }
      </style>
    </div>
  );
}
 
export default Loader; 