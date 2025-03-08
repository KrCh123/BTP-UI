import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const Homepage = () => {
    return (
        <section className="banner" id="home">
            <Container>
                <Row>
                    <Col xs={12} md={6} xl={7}>
                        <div className="homeText">
                            <span className='role'>Professor - CSE Department</span>
                            <h1>Hello!</h1>
                            <h1 className='home-name'>Krish Chawla</h1>
                            <p>Welcome to our Teacher's Portal, your dedicated space for crafting impactful learning experiences. Here, you can seamlessly design exams, monitor student progress, and access a wealth of teaching resources tailored to your needs. Let's collaborate to inspire and educate the next generation.</p>
                        </div>
                    </Col>
                    <Col xs={12} md={6} xl={5}>
                        <div className='section-pic-container'>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/NSUT_logo.png" alt="Krish Chawla" className='section-pic' />
                        </div>
                    </Col>
                </Row>
            </Container>
        </section >
    );
}