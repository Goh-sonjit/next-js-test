import Slider from "react-slick";
import clientslogo from "../../pages/about-us/clients";
import Enquireregister from "./enquireregister";
import styles from '../../styles/enquire.module.scss'  ;
const Enquire = () => {
  const slice = clientslogo.slice(0, 21);
  {
    var settings = {
      pauseOnHover: false,
      infinite: true,
      slidesToShow: 7,
      slidesToScroll: 3,
      autoplay: true,
      speed: 4700,
      autoplaySpeed: 4700,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 0,
          },
        },
        {
          breakpoint: 425,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
          },
        },
      ],
    };
  }
  return (
    <>
     <section className={`${styles.our_clients_content} my-4 enqry`} >
       <Slider {...settings}>
         {slice.map((clients, i) => (
           <div className="container pt-md-3" key={i}>
             <div className="row  ">
               <div className="col p-md-3 ">
             
            
                   <img
                     src={clients.img}
                     alt={clients.alt}
                     key={i}
                     className={`rounded-2  ${styles.trending_cardd}`}
                   />
               </div>
             </div>
           </div>
         ))}
       </Slider>

   </section>
      <div className={`container-xxl  container-xl container-lg container-md ${styles.enquire_content} py-2 py-md-5 my-md-3 px-md-5 `}>
        <div className={`row p-2 ${styles.enquire_description_row}`}>
          <div className={` col-md-4  p-4 p-md-3  ${styles.enquire_description} col-xs-0`}>
            <h3 className={`${styles.enquire_qsns_cant} text-light`}>
              What can Gohoardings
              <br /> help you with?
            </h3>
            <p className={`${styles.hor_border} py-2`}> </p>

            <div className="row ">
              <h6 className={`${styles.enquire_qsns_cant_qsn}  mb-1`}>
                Have a requirement ?
              </h6>
              <p className={styles.enquire_ans_cant}>
                Tell us your requirements and we will reach you with the
                brainstormed, creative and most effective solutions instantly.
              </p>
            </div>
            <div className="row py-1">
              <h6 className={`${styles.enquire_qsns_cant_qsn}  mb-1`}>Have a query ?</h6>
              <p className={styles.enquire_ans_cant}>
                Feel free to write to us. Our reps are right there to answer
                them all.
              </p>
            </div>
            <div className="row py-1">
              <h6 className={styles.enquire_qsns_cant_qsn}>Have a suggestion?</h6>
              <p className={`${styles.enquire_ans_cant} mb-4`}>
                Your feedback and suggestions are always welcome. We are
                constantly striving to be better than what we were yesterday.
              </p>
            </div>
          </div>
          <div className=" col-md-8 p-md-3 p-md-3 ps-md-5 pt-md-2 ">
            <Enquireregister />
          </div>
        </div>
      </div>
    </>
  );
};

export default Enquire;
