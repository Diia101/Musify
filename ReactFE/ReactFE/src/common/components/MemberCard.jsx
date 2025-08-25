import { css } from "@emotion/react";
import { Card } from "@mui/material";
import PropTypes from "prop-types";

const cardCss = css`
  background-color: #defff2;
  border-radius: 15px;
  color: #000;
  margin-top: 21px;
  font:
    700 16px Poppins,
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 210px;
  width: 180px;
  text-align: center;

  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);

  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

function MemberCard(props) {
  const member = props.member
    ? props.member
    : {
        firstname: "Missing Firstname",
        lastname: "Missing Lastname",
      };

  return (
    <>
      <Card css={cardCss}>
        <img src="Icons/Members/icon-member.png" />
        <p>
          `{member.firstname} {member.lastname}`
        </p>
      </Card>
    </>
  );
}

MemberCard.propTypes = {
  member: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
};

export default MemberCard;
