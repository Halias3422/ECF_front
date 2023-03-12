import SvgDelete from '@/components/svgs/delete';
import { ModifyDashboardItem } from '@/interfaces/dashboard';
import { Formula } from '@/interfaces/formulas';
import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import styled from 'styled-components';
import HandleAttributeInputType from './HandleAttributeInputType';

const FormulasInput = ({
  attribute,
  item,
}: {
  attribute: string;
  item: ModifyDashboardItem;
}) => {
  const [menuFormulas, setMenuFormulas] = useState<Formula[]>(
    item.attributes[attribute]
  );

  const changeFormulaAttribute = (
    e: ChangeEvent<HTMLInputElement>,
    formulaAttribute: string,
    index: number
  ) => {
    item.attributes[attribute][index][formulaAttribute] = e.target.value;
    setMenuFormulas(item.attributes[attribute]);
  };

  const handleDeleteFormula = (index: number) => {
    setMenuFormulas(
      menuFormulas.filter((formula) => formula !== menuFormulas[index])
    );
    item.attributes[attribute] = item.attributes[attribute].filter(
      (formula: Formula) => formula !== item.attributes[attribute][index]
    );
  };

  return (
    <>
      {menuFormulas.map((formula: Formula, index: number) => {
        return (
          <FormulaContainer key={formula.title + index}>
            <TitleContainer>
              <h3>Formule {index + 1}</h3>
              <DeleteButton
                title="Supprimer la formule"
                onClick={() => handleDeleteFormula(index)}
              >
                <SvgDelete />
              </DeleteButton>
            </TitleContainer>
            {Object.keys(formula).map(
              (formulaAttribute: string, attributeIndex: number) => {
                if (formulaAttribute !== 'id') {
                  return (
                    <React.Fragment key={formulaAttribute + attributeIndex}>
                      <label htmlFor={formula.title + formulaAttribute}>
                        {formulaAttribute}
                      </label>
                      <HandleAttributeInputType
                        attribute={formulaAttribute}
                        item={{
                          context: {
                            id: formula.id as string,
                            confirm: false,
                            error: '',
                          },
                          attributes: {
                            id: formula.id as string,
                            title: formula.title,
                            description: formula.description,
                            price: formula.price,
                          },
                        }}
                        changeItemAttribute={(
                          e: ChangeEvent<HTMLInputElement>
                        ) => changeFormulaAttribute(e, formulaAttribute, index)}
                      />
                    </React.Fragment>
                  );
                }
              }
            )}
          </FormulaContainer>
        );
      })}
    </>
  );
};

const FormulaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
  background-color: ${(props) => props.theme.lightGreen};
  padding: 20px 0px;
  border-radius: 24px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  h3 {
    margin-bottom: 0px;
  }
`;

const DeleteButton = styled.button`
  margin-left: 10px;
  width: 42px;
  height: 42px;
  cursor: pointer;
`;

const Warning = styled.h2`
  color: ${(props) => props.theme.darkGrey};
  font-size: 22px;
`;

export default FormulasInput;