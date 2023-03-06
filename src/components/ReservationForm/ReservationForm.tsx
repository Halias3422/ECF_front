import { ReservationFormData } from '@/interfaces/reservation';
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

  return (
    <section
      id="reservationSection"
      className={`section ${$isOdd ? 'odd' : 'even'}`}
    >
      <div className="container">
        <ReservationFormContainer>
          <Header className="themeLightGreen">Réservation</Header>
          <Form>
            <FormItem>
              <label htmlFor="numberGuests">Nombre de couverts:</label>
              <input
                type="number"
                id="numberGuests"
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
                onChange={(e) =>
                  setReservationData({
                    ...reservationData,
                    date: e.target.value,
                  })
                }
              />
            </FormItem>
            <FormItem>
              <label htmlFor="allergies">
                Allergies ou demandes supplémentaires:
              </label>
              <TextArea
                id="allergies"
                onChange={(e) =>
                  setReservationData({
                    ...reservationData,
                    allergies: e.target.value,
                  })
                }
              />
            </FormItem>
            <FormSubmit textContent="Confirmer" theme="themeDarkGreen" />
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
