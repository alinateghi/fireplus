import React, { useRef, useState } from "react";
// import { Link } from 'react-router-dom'
import {
	CButton,
	CCard,
	CCardBody,
	CCardGroup,
	CCol,
	CContainer,
	CForm,
	CInput,
	CInputGroup,
	CInputGroupPrepend,
	CInputGroupText,
	CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useAuth } from "src/auth/AuthContext";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [inProgress, setInProgress] = useState(false);
	const userRef = useRef();
	const passRef = useRef();
	const { login } = useAuth();

	const doLogin = async () => {
		setInProgress(true);
		const isSuccess = await login(username, password);
		if (!isSuccess) {
			setInProgress(false);
			userRef.current.focus();
		}
	};

	return (
		<div className="c-app c-default-layout flex-row align-items-center">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol md="8">
						<CCardGroup>
							<CCard className="p-4">
								<CCardBody>
									<CForm>
										<h1>ورود</h1>
										<p className="text-muted">
											مشخصات حساب خود را وارد کنید
										</p>
										<CInputGroup className="mb-3">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-user" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												innerRef={userRef}
												type="text"
												placeholder="نام کاربری"
												autoComplete="username"
												onChange={(e) =>
													setUsername(e.target.value)
												}
												onKeyPress={(e) =>
													e.key === "Enter" &&
													passRef.current?.focus()
												}
											/>
										</CInputGroup>
										<CInputGroup className="mb-4">
											<CInputGroupPrepend>
												<CInputGroupText>
													<CIcon name="cil-lock-locked" />
												</CInputGroupText>
											</CInputGroupPrepend>
											<CInput
												innerRef={passRef}
												type="password"
												placeholder="گذرواژه"
												autoComplete="current-password"
												onChange={(e) =>
													setPassword(e.target.value)
												}
												onKeyPress={(e) =>
													e.key === "Enter" &&
													doLogin()
												}
											/>
										</CInputGroup>
										<CRow>
											<CCol xs="6">
												<CButton
													color="primary"
													className="px-4"
													onClick={doLogin}
													disabled={inProgress}
												>
													ورود
													{inProgress && (
														<span
															className="spinner-border spinner-border-sm mr-2"
															style={{
																verticalAlign:
																	"middle",
															}}
														></span>
													)}
												</CButton>
											</CCol>
											{/* <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">اطلاعات خود را فراموش کرده اید؟</CButton>
                      </CCol> */}
										</CRow>
									</CForm>
								</CCardBody>
							</CCard>
							<CCard
								className="text-white bg-primary py-5 d-md-down-none"
								style={{ width: "44%" }}
							>
								<CCardBody className="text-center">
									<div>
										<h2>ثبت نام</h2>
										<p>
											برای ثبت نام و دریافت حساب کاربری
											خود به مجری پنل هوشمند خود مراجعه
											فرمایید.
										</p>
										{/* <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link> */}
									</div>
								</CCardBody>
							</CCard>
						</CCardGroup>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
};

export default Login;
