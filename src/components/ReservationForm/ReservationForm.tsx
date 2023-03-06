import { ReservationFormData } from '@/interfaces/reservation';
import { roboto } from '@/styles/fonts';
import { useState } from 'react';
import styled from 'styled-components';
import FormSubmit from '../FormSubmit/FormSubmit';

const ReservationForm = ({ $isOdd }: { $isOdd: boolean }) => {
  const [reservationData, setReservationData] = useState<ReservationFormData>({
    guestNumber: '1',
    date: '',
    time: '',
    allergies: '',
  });
  const today = new Date();
  //return yyyy-mm-dd format
  const minReservation = today.toISOString().split('T')[0];
  const maxReservation = new Date(today.setDate(today.getDate() + 90))
    .toISOString()
    .split('T')[0];

  // TODO add max reservation time in admin panel ?
  // TODO add max guest size
  // TODO retreive default guests and allergies values
  // TODO handle form submit
  return (
    <section
      id="reservationSection"
      className={`section ${$isOdd ? 'odd' : 'even'}`}
    >
      <div className="container">
        <ReservationFormContainer>
          <Header className="themeLightGreen">Réservation</Header>
          <Form>
            <GuestsAndDateContainer>
              <FormItem>
                <label htmlFor="numberGuests">Nombre de couverts:</label>
                <input
                  type="number"
                  id="numberGuests"
                  className={`flexInput ${roboto.className}`}
                  min="1"
                  max="45"
                  defaultValue="1"
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      guestNumber: e.target.value,
                    })
                  }
                />
              </FormItem>
              <FormItem>
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  className={`flexInput ${roboto.className}`}
                  min={minReservation}
                  max={maxReservation}
                  onChange={(e) =>
                    setReservationData({
                      ...reservationData,
                      date: e.target.value,
                    })
                  }
                />
              </FormItem>
            </GuestsAndDateContainer>
            <FormItem>
              <label htmlFor="allergies">
                Allergies ou demandes supplémentaires:
              </label>
              <TextArea
                id="allergies"
                className={roboto.className}
                onChange={(e) =>
                  setReservationData({
                    ...reservationData,
                    allergies: e.target.value,
                  })
                }
              />
            </FormItem>
            <FormItem id="submitItem">
              <FormSubmit textContent="Confirmer" theme="themeDarkGreen" />
            </FormItem>
          </Form>
        </ReservationFormContainer>
      </div>
    </section>
  );
};

const ReservationFormContainer = styled.article`
  width: 100%;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h2`
  width: 100%;
  text-align: center;
  margin: 0px;
  padding: 40px 10%;
`;

const Form = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.snow};
  color: ${(props) => props.theme.darkGrey};
  padding: 60px 10%;
  text-align: center;
  width: 80%;
  #submitItem {
    margin-bottom: 10px;
  }
`;

const GuestsAndDateContainer = styled.div`
  @media screen and (min-width: 769px) {
    display: flex;
    gap: 10%;
    .flexInput {
      max-width: 320px;
    }
  }
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin-bottom: 60px;
  input {
    width: 100%;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
`;

export default ReservationForm;
