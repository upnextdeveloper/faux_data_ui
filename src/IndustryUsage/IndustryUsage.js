import { ListGroup } from "react-bootstrap";
import './IndustryUsage.css'

function IndustryUsage() {
    return (
        <>
            <div>
                <ListGroup>
                    <ListGroup.Item as="li" className="left">
                        <div>
                            <p className={'header'}>Software Development & Testing</p>
                            <ul>
                                <li>Load Testing: Simulate large-scale user activity to test system performance.</li>
                                <li>UI/UX Testing: Populate apps with realistic data for better visual and functional validation.</li>
                                <li>Integration Testing: Ensure systems work together smoothly without using real customer data.</li>
                            </ul>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="right">
                        <div>
                            <p className={'header'}>AI & Machine Learning</p>
                            <ul>
                                <li>Model Training: Generate synthetic datasets to train ML models when real data is limited.</li>
                                <li>Bias Reduction: Balance training datasets to remove bias in AI systems.</li>
                                <li>Anonymization: Create alternative datasets that mimic real-world distributions while protecting privacy.</li>
                            </ul>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="left">
                        <div>
                            <p className={'header'}>Cybersecurity & Ethical Hacking</p>
                            <ul>
                                <li>Fraud Detection Training: Generate synthetic fraudulent transactions to train fraud detection models.</li>
                                <li>Penetration Testing: Use fake user accounts and transactions to test security vulnerabilities.</li>
                            </ul>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="right">
                        <div>
                            <p className={'header'}>Data Privacy & Compliance</p>
                            <ul>
                                <li>GDPR/CCPA Compliance: Replace sensitive data with synthetic equivalents to protect user privacy.</li>
                                <li>De-Identification: Mask real customer data with fake but structurally similar records.</li>
                            </ul>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="left">
                        <div>
                            <p className={'header'}>Finance & FinTech</p>
                            <ul>
                                <li>Simulating Transactions: Test banking apps with realistic but non-sensitive transaction data.</li>
                                <li>Stock Market Simulations: Generate historical and real-time fake stock price data for testing trading algorithms.</li>
                            </ul>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="right">
                        <div>
                            <p className={'header'}>Healthcare & Medical Research</p>
                            <ul>
                                <li>Synthetic Patient Data: Create realistic medical records without exposing real patients.</li>
                                <li>Clinical Trial Simulations: Generate data for trial designs before conducting real-world tests.</li>
                            </ul>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                        <p>And so much more!</p>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </>
    )
}

export default IndustryUsage;