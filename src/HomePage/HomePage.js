import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {

    return (
        <div>
            <h1>Power Up Your Programming Projects</h1>
            <h4>Demonstrate the validity of your software Projects
                with data.
            </h4>
            <Button>
                <Link to="/generator">Let's Generate!!!</Link>
            </Button>
            <hr />
            <h4>Who can use us:</h4>
            <ul>
                <li>
                    <p>Software Testing & QA</p>
                    <p>Programmers and Testers need to
                        test and validate their applications
                        without using any potentially sensitive
                        user information.
                    </p>
                </li>
                <li>
                    <p>AI & Machine Learning</p>
                    <p>Synthetic data helps train AI models when real-world data 
                        is scarce, expensive, or privacy-restricted.
                    </p>
                </li>
                <li>
                    <p>Data Privacy & Security</p>
                    <p>Many industries (finance, healthcare, etc.) use fake data for 
                        development to prevent exposing real customer data.
                    </p>
                </li>
                <li>
                    <p>Database Population</p>
                    <p>New applications require large datasets for performance testing and UI validation.
                    </p>
                </li>
                <li>
                    <p>Penetration Testing</p>
                    <p>Ethical hackers and security teams use fake user profiles and 
                        transactions to simulate attacks.
                    </p>
                </li>
            </ul>
            <hr />
            <h4>Popular Industry Usages:</h4>
            <ol>
                <li>Software Development & Testing
                    <ul>
                        <li>Load Testing: Simulate large-scale user activity to test system performance.</li>
                        <li>UI/UX Testing: Populate apps with realistic data for better visual and functional validation.</li>
                        <li>Integration Testing: Ensure systems work together smoothly without using real customer data.</li>
                    </ul>
                </li>
                <li>AI & Machine Learning
                    <ul>
                        <li>Model Training: Generate synthetic datasets to train ML models when real data is limited</li>
                        <li>Bias Reduction: Balance training datasets to remove bias in AI systems.</li>
                        <li>Anonymization: Create alternative datasets that mimic real-world distributions while protecting privacy.</li>
                    </ul>
                </li>
                <li>Cybersecurity & Ethical Hacking
                    <ul>
                        <li>Fraud Detection Training: Generate synthetic fraudulent transactions to train fraud detection models.</li>
                        <li>Penetration Testing: Use fake user accounts and transactions to test security vulnerabilities.</li>
                    </ul>
                </li>
                <li>Data Privacy & Compliance
                    <ul>
                        <li>GDPR/CCPA Compliance: Replace sensitive data with synthetic equivalents to protect user privacy.</li>
                        <li>De-Identification: Mask real customer data with fake but structurally similar records.</li>
                    </ul>
                </li>
                <li>Finance & FinTech
                    <ul>
                        <li>Simulating Transactions: Test banking apps with realistic but non-sensitive transaction data.</li>
                        <li>Stock Market Simulations: Generate historical and real-time fake stock price data for testing trading algorithms.</li>
                    </ul>
                </li>
                <li>Healthcare & Medical Research
                    <ul>
                        <li>Synthetic Patient Data: Create realistic medical records without exposing real patients.</li>
                        <li>Clinical Trial Simulations: Generate data for trial designs before conducting real-world tests.</li>
                    </ul>
                </li>
                <li>And so much more!</li>
            </ol>
            <br/>
            <hr/>
            <Button>
                <Link to="/generator">Let's Generate!!!</Link>
            </Button>
        </div>
    )
}

export default HomePage;