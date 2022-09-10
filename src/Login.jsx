import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useState } from "react";

// 테스트용 더미데이터
const User = {
  email: 'test@ex.com',
  pw:'test123#'
}

export default function Login() {
  const [email, setEmail] = useState(""); //입력받는 값을 email 값으로 사용하기 위함
  const [pw, setPw] = useState(""); //입력받는 값을 pw 값으로 사용하기 위함
  
  const [emailVaild, setEmailValid] = useState(false) //이메일 유효성 체크용 
  const [pwVaild, setPwValid] = useState(false) //패스워드 유효성 체크용 
  const [notAllow, setNotAllow] = useState(false) //이메일, 비밀번호 valid 체크용

  const handleEmail = (e) => {
    setEmail(e.target.value);
    
    /** 정규표현식 */
    const regex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  
    //정규표현식으로 테스트 해보았을 때
    if(regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }

  }

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const onClickConfirmButton = () => {
    // 입력된 email과 pw가 User안의 값과 동일하면 성공했다고 알림
    if(email === User.email && pw === User.pw) {
      alert("로그인에 성공 했습니다.")
    } else {
      alert("등록되지 않은 회원입니다.")
    }
    
  }

  useEffect(() => {
    if(emailVaild && pwVaild) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
    
  }, [emailVaild, pwVaild])

  return (
    <div className="page">
      <div className="titleWrap">
        이메일과 비밀번호를
        <br />
        입력해주세요
      </div>

      <div className="contentWrap">
        <div className="inputTitle">이메일주소</div>

        <div className="inputWrap">
          <input
            type='text'
            className="input"
            placeholder="test@gmail.com"
            value={email}
            onChange={handleEmail} //사용자가 입력한 값으로 세팅
            // onChange={(e)=>setEmail(e.target.value)} : 타이핑을 받을 때 마다(이벤트 발생) setEmail로 값을 세팅해줌
          ></input>
        </div>

        <div className="errorMessageWrap">
          {
            // 정규 표현식에 따라서 vaild 값이 유효하고, 입력 값의 길이가 0 이상인 경우에만
            // div 안의 텍스트를 노출시킨다.
            !emailVaild && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>

            )}

        </div>

        <div className="inputTitle" style={{ marginTop: "26px" }}>
          비밀번호
        </div>

        <div className="inputWrap">
          <input
            type="password"
            className="input"
            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            value={pw}
            onChange={handlePw}
          ></input>
        </div>

        <div className="errorMessageWrap">
        {
            !pwVaild && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>

            )}
          
        </div>
      </div>

      <div>
        <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
          확인
        </button>
      </div>
    </div>
  );
}
