
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeliveryFirmApi from '../../api/DeliveryFirmApi';
import { editIcon } from '../../assets/icons';
import Loading from '../../components/Loading';
//import ProfileDetails from '../../components/ProfileDetails';
import ProfileHeader from '../../components/ProfileHeader';
import Reload from '../../components/Reload';
import { DELIVERY_FIRM, FETCH_STATUSES, getDeliveryFirmsListFetchStatusAction } from '../../context/AppActions';
import { useAppContext } from '../../context/AppContext';
import { useDataRender } from '../../context/AppHooks';

export default function DeliveryFirm() {

  const dID = parseInt(useParams().ID);

  const {
    user: { user },
    deliveryFirms: {
      deliveryFirm: {
        deliveryFirm,
        deliveryFirmFetchStatus
      }
    },
    deliveryFirmsDispatch
  } = useAppContext();

  useEffect(()=> {
    if (deliveryFirm !== null && dID !== deliveryFirm.id) {
      deliveryFirmsDispatch({ type: DELIVERY_FIRM.UNFETCH });
    } else if (deliveryFirmFetchStatus === FETCH_STATUSES.LOADING) {
      const api = new DeliveryFirmApi(user.api_token);
      api.get(dID, deliveryFirmsDispatch);
    }
  }, [dID, user, deliveryFirm, deliveryFirmFetchStatus, deliveryFirmsDispatch]);

  function refetchDeliveryFirm() {
    if (deliveryFirmFetchStatus !== FETCH_STATUSES.LOADING) 
      deliveryFirmsDispatch(getDeliveryFirmsListFetchStatusAction(FETCH_STATUSES.LOADING));
  }

  return (
    <section>
      <div className="container-x">
        { 
          useDataRender(
            deliveryFirm, 
            deliveryFirmFetchStatus,
            ()=> (
              <div>
                <ProfileHeader
                  photo={`/photos/delivery-firm/${deliveryFirm.photo}`}
                  name={deliveryFirm.name}
                  links={[
                    {
                      href: `/delivery-firm/${deliveryFirm.id}/update`,
                      title: '_extra.Edit',
                      icon: editIcon
                    }
                  ]}
                  />

                {/* <ProfileDetails 
                  details={[
                    {
                      icon: phoneIcon,
                      data: customer.phone_number
                    },
                    {
                      icon: emailIcon,
                      data: customer.email
                    },
                    {
                      icon: dateIcon,
                      data: customer.created_at
                    }
                  ]}
                  /> */}
              </div>
            ),
            (k)=> <div className="container-x"> <Loading /> </div>, 
            (k)=> <div className="container-x"> <Reload action={refetchDeliveryFirm} /> </div>,
          )
        }
      </div>
    </section>
  )
}
