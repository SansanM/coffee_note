

import { Row, Col, Container } from "react-bootstrap";
import HeaderComponrts from "./component/header";
import classes from "./css/Layout.module.css"

const Layout = (props) => {
    const { title, children } = props
    const siteTitle = "coffee note"
    return (
        <div className={classes.page}>
            <title>{title ? `${title} | ${siteTitle}` : siteTitle}l
                <link rel="icon" href="/favicon.ico" /></title>

            <header>
                <HeaderComponrts />
            </header>
            <br/>

            <main>
                <div className="page-main">
                    <Container>
                        <Row className={classes.contents} >
                            <Col>
                                {children}
                            </Col>
                        </Row>
                    </Container>

                </div>
            </main>
            <footer className={classes.footer}>
                &copy; {siteTitle}
            </footer>
        </div>
    )
}



export default Layout