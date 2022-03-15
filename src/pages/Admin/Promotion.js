
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import AlertDialog from '../../components/dialog/AlertDialog';
import LoadingDialog from '../../components/dialog/LoadingDialog';
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
    fetch,
    promotion,
    promotionLoading,
    promotionError,
    promotionID,
    unfetch
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
      if ((promotion !== null || promotionError !== null) && String(promotionID) !== ID) 
        unfetch();
      else if (promotion === null && promotionError === null)
        fetch(ID);
    },
    [ID, promotion, promotionError, promotionID, fetch, unfetch]
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
                  title: '_extra.Link_type',
                  body: promotion.link_type
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
          promotionError === NetworkErrorCodes.UNKNOWN_ERROR &&
          <Reload action={fetch} />
        }

      </div>
    </section>
  );
}
