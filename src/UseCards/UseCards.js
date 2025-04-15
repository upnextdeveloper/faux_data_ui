
import { Card, CardGroup } from "react-bootstrap";
import './UseCards.css';
import safety from './safety.png'
import ai from './ai.png'
import encrypted from './encrypted.png'
import database from './database.png'
import hacker from './hacker.png'
import design from './design.png'

function UseCards() {
    return (
        <div className={'back_color'}>
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={safety}/>
                    <Card.Body>
                        <Card.Title>Software Testing & QA</Card.Title>
                        <Card.Text>
                            Programmers and Testers need to
                            test and validate their applications
                            without using any potentially sensitive
                            user information.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={ai} />
                    <Card.Body>
                        <Card.Title>AI & Machine Learning</Card.Title>
                        <Card.Text>
                            Synthetic data helps train AI models when real-world data
                            is scarce, expensive, or privacy-restricted.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={encrypted} />
                    <Card.Body>
                        <Card.Title>Data Privacy & Security</Card.Title>
                        <Card.Text>
                            Many industries (finance, healthcare, etc.) use fake data for
                            development to prevent exposing real customer data.
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Img variant="top" src={database} />
                    <Card.Body>
                        <Card.Title>Database Population</Card.Title>
                        <Card.Text>
                            New applications require large datasets for performance testing and UI validation.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={hacker} />
                    <Card.Body>
                        <Card.Title>Penetration Testing</Card.Title>
                        <Card.Text>
                            Ethical hackers and security teams use fake user profiles and
                            transactions to simulate attacks.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Img variant="top" src={design}/>
                    <Card.Body>
                        <Card.Title>UI/UX Testing</Card.Title>
                        <Card.Text>
                            To ensure that a user interface handles all use project 
                            use cases.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </CardGroup>
        </div>
    )
}

export default UseCards;