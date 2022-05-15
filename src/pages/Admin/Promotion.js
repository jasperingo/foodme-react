
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AlertDialog from '../../components/dialog/AlertDialog';
import LoadingDialog from '../../components/dialog/LoadingDialog';
import Forbidden from '../../components/Forbidden';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ProfileDetailsText from '../../components/profile/ProfileDetailsText';
import ProfileHeaderText from '../../components/profile/ProfileHeaderText';
import Reload from '../../components/Reload';
import NetworkErrorCodes from '../../errors/NetworkErrorCodes';
import { useHeader } from '../../hooks/headerHook';
import { usePromotionDelete } from '../../hooks/promotion/promotionDeleteHook';
import { usePromotionFetch } from '../../hooks/promotion/promotionFetchHook';
import { useDateFormatter, useMoneyFormatter } from '../../hooks/viewHook';

export default function Promotion() {

  const { ID } = useParams();

  const history = useHistory();

  const dateFomatter = useDateFormatter();

  const moneyFormat = useMoneyFormatter();

  const [dialog, setDialog] = useState(null);

  const [
    fetchPromotion,
    promotion,
    promotionLoading,
    promotionError,
    promotionID,
    unfetchPromotion
  ] = usePromotionFetch();

  const [
    deleteSubmit,
    deleteLoading, 
    deleteSuccess,
    deleteError
  ] = usePromotionDelete();

  useHeader({ 
    title: `${promotion?.title ?? 'Loading...'} - Promotion`,
    headerTitle: '_promotion.Promotion'
  });

  useEffect(
    function() {
      if ((promotion !== null || promotionError !== null) && promotionID !== ID) 
        unfetchPromotion();
      else if (promotion === null && promotionError === null)
        fetchPromotion(ID);
    },
    [ID, promotion, promotionError, promotionID, fetchPromotion, unfetchPromotion]
  );

  useEffect(
    function() {

      if (deleteSuccess) 
        history.push('/promotions');

      if (deleteError !== null)
        setDialog({
          body: deleteError,
          positiveButton: {
            text: '_extra.Done',
            action() {
              setDialog(null);
            }
          }
        });
    },
    [deleteSuccess, deleteError, history]
  );
  
  return (
    <section>
      <div className="container-x">

        {
          promotion !== null &&
          <div>
            <img 
              width={300}
              height={200}
              alt={promotion.title}
              src={promotion.photo.href}
              className="block w-full h-60 my-4 rounded"
              />

            <ProfileHeaderText
              text={promotion.title}
              buttons={[
                {
                  text: '_extra.Delete',
                  color: 'btn-color-red',
                  action() {
                    setDialog({
                      body: '_promotion._delete_promotion_confirm',
                      positiveButton: {
                        text: '_extra.Yes',
                        action() {
                          setDialog(null);
                          deleteSubmit(ID);
                        }
                      },
                      negativeButton: {
                        text: '_extra.No',
                        action() {
                          setDialog(null);
                        }
                      }
                    });
                  }
                }
              ]}
              />

            <ProfileDetailsText
              details={[
                {
                  title: '_extra.Link',
                  body: promotion.link
                },
                {
                  title: '_extra.Call_to_action',
                  body: promotion.call_to_action
                },
                {
                  title: '_extra.Amount',
                  body: moneyFormat(promotion.amount)
                },
                {
                  title: '_extra.Expiring_on',
                  body: dateFomatter(((new Date(promotion.created_at)).getTime()) + (promotion.duration * 24 * 60 * 60) * 1000)
                },
                {
                  title: '_extra.Created_on',
                  body: dateFomatter(promotion.created_at)
                },
              ]}
              />

            { deleteLoading && <LoadingDialog /> }

            { dialog && <AlertDialog dialog={dialog} /> }
          </div>
        }

        {
          promotionLoading &&
          <Loading />
        }

        {
          promotionError === NetworkErrorCodes.NOT_FOUND &&
          <NotFound />
        }

        {
          promotionError === NetworkErrorCodes.FORBIDDEN &&
          <Forbidden />
        }

        {
          promotionError === NetworkErrorCodes.UNKNOWN_ERROR &&
          <Reload action={fetchPromotion} />
        }

        {
          promotionError === NetworkErrorCodes.NO_NETWORK_CONNECTION &&
          <Reload message="_errors.No_netowrk_connection" action={fetchPromotion} />
        }

      </div>
    </section>
  );
}
