import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { returnErrors } from '../actions/errorActions';

const LandingPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { user } = userRegister;

   const userLogin = useSelector((state) => state.userLogin);
   const { loggedUser } = userLogin;

   useEffect(() => {
      if (!user && !loggedUser) {
         dispatch(returnErrors('Please Login!'));

         navigate('/login');
      }
   }, [user, loggedUser, navigate, dispatch]);

   return (
      <div className="landing-page">
         <div className="favorite-files">
            <div className="head">
               <h4>Favourite Files</h4>
            </div>
            <div className="content">
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
               <div className="file">
                  <div className="head">
                     <i className="far fa-star"></i>
                     <i className="fas fa-ellipsis-v"></i>
                  </div>
                  <div className="body">
                     <img
                        src="https://www.biography.com/.image/t_share/MTM2OTI2NTY2Mjg5NTE2MTI5/justin_bieber_2015_photo_courtesy_dfree_shutterstock_348418241_croppedjpg.jpg"
                        alt=""
                     />
                     <strong>07038803037</strong>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LandingPage;
