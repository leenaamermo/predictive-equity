import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [inflation, setInflation] = useState(8.4);
  const [absenteeism, setAbsenteeism] = useState(12);
  const [activeStep, setActiveStep] = useState(0);

  const sections = [
    { id: 'introduction', short: 'Introduction', number: '01' },
    { id: 'actuarial', short: 'Actuarial problem', number: '02' },
    { id: 'offline-fintech', short: 'Offline FinTech', number: '03' },
    { id: 'scaling', short: 'Grassroots to scale', number: '04' },
    { id: 'conclusion', short: 'Conclusion', number: '05' },
  ];

  useEffect(() => {
    const targets = sections.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-22% 0px -58% 0px', threshold: [0, 0.15, 0.35, 0.6] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const model = useMemo(() => {
    const cohort = 10000;
    const baselineMonthlyCost = 8;
    const absenceDaysPerAffectedPerson = 3;
    const outputProxyPerDay = 115;
    const subsidyShare = 0.5;
    const absenteeismCost = cohort * (absenteeism / 100) * absenceDaysPerAffectedPerson * outputProxyPerDay;
    const annualSubsidy = cohort * baselineMonthlyCost * (inflation / 100) * subsidyShare * 12;
    const avoidedAbsenteeism = absenteeismCost * 0.65;
    const avoidedHealthBurden = annualSubsidy * 0.35;
    const modeledBenefit = avoidedAbsenteeism + avoidedHealthBurden;
    const roi = annualSubsidy > 0 ? ((modeledBenefit - annualSubsidy) / annualSubsidy) * 100 : 0;
    return { absenteeismCost, annualSubsidy, modeledBenefit, roi };
  }, [inflation, absenteeism]);

  const money = (amount: number) => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0,
  }).format(amount);

  const flowSteps = [
    {
      title: 'USSD text',
      eyebrow: 'BASIC MOBILE NETWORK',
      detail: 'USSD (Unstructured Supplementary Service Data) operates on basic legacy mobile networks without internet. A user dials a simple, free text-based short code (e.g., *123#); the secure interface connects to a ledger that handles tokenized digital vouchers and micro-payments.',
    },
    {
      title: 'Tokenized voucher',
      eyebrow: 'LEDGER-ISSUED VALUE',
      detail: 'The USSD interface connects to a ledger that handles tokenized digital vouchers and micro-payments. In the proposed flow, this digital subsidy is assigned to a registered user and can be redeemed without requiring a smartphone application.',
    },
    {
      title: 'Smart card',
      eyebrow: 'OFFLINE CONTACTLESS',
      detail: 'Offline contactless smart cards are distributed to registered users and pre-loaded with digital subsidies. Low-power point-of-sale devices process transactions offline, then sync data at the end of the operating day.',
    },
    {
      title: 'Tax-free release',
      eyebrow: 'AT THE POINT OF SALE',
      detail: 'At the point of sale, the physical card applies the subsidy to automatically strip away the Pink Tax. The user receives hygiene products at a stable, tax-free price; a tiny fixed monthly micro-insurance premium, paid through basic mobile airtime, helps keep costs predictable through supply-chain shocks.',
    },
  ];

  return (
    <div className="paper-grain">
      <header className="site-shell topbar">
        <div className="wordmark"><span className="wordmark-mark">P</span><span>Research dossier</span></div>
        <div className="top-meta"><span>University research proposal</span><span>Proposal&nbsp; / &nbsp;01</span></div>
      </header>

      <main>
        <div className="site-shell hero">
          <div className="reveal">
            <div className="eyebrow">Actuarial science&nbsp; · &nbsp;Offline financial technology</div>
            <h1>Predictive <em>Equity</em></h1>
            <p className="hero-deck">Integrating Actuarial Risk Modeling and Offline FinTech Systems to Mitigate the Pink Tax and Period Poverty</p>
            <div className="byline">
              <span className="author-seal">ل</span>
              <div><strong>Leen Amer Mohammed <span lang="ar" dir="rtl">(لين عامر محمد)</span></strong><span>Research &amp; Writing</span></div>
            </div>
          </div>
          <div className="hero-art reveal-delay">
            <img src={`${import.meta.env.BASE_URL}women-community.jpe`} alt="Community members gathered in conversation, representing the people-centered design of the proposed system." />
            <span className="hero-note">A COMMUNITY-DRIVEN MODEL</span>
            <span className="art-index">01—05</span>
            <span className="orbit-mark" aria-hidden="true" />
            <span className="art-label">RESEARCH PROPOSAL&nbsp; / &nbsp;PREDICTIVE EQUITY</span>
          </div>
        </div>

        <nav className="section-nav" aria-label="Research sections">
          <div className="site-shell nav-inner">
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`} className={`nav-link${activeSection === section.id ? ' active' : ''}`}
                aria-current={activeSection === section.id ? 'location' : undefined}
                data-testid={`link-section-${section.id}`}>
                <span className="nav-no">{section.number}</span>{section.short}
              </a>
            ))}
          </div>
        </nav>

        <div className="site-shell content">
          <section className="paper-section" id="introduction" aria-labelledby="title-introduction" data-testid="section-introduction">
            <div className="section-grid">
              <aside className="section-meta"><div className="section-no">SECTION 01</div><p>Context<br />&amp; proposition</p></aside>
              <div className="section-body">
                <h2 id="title-introduction">The necessity <span className="accent">gap.</span></h2>
                <div className="prose">
                  <p>In the realm of global macroeconomics, certain goods transcend the typical laws of supply and demand due to their biological necessity. Feminine hygiene products represent a perfectly inelastic essential good for half of the world’s population. However, the convergence of surging global inflation, corporate “premiumization”—where dominant brands like Always market enhanced design features while remaining silent on pricing affordability—and the persistence of the “Pink Tax” has triggered an unprecedented affordability crisis.</p>
                  <p>This gender-based price discrimination operates not only through state-imposed luxury taxes but also via market-driven premiums, where identical items are priced higher simply for female-targeted aesthetics like color customization. When individuals are financially excluded from accessing these basic necessities, the macroeconomic consequences are severe, culminating in educational absenteeism and diminished labor productivity.</p>
                  <p>This paper proposes a novel financial framework that synthesizes Actuarial Science and Financial Technology (FinTech) to construct a decentralized, offline, and community-driven micro-insurance ecosystem designed to eliminate tax inequities and stabilize prices for vulnerable populations.</p>
                </div>
                <div className="intro-callout">
                  <div className="callout-symbol" aria-hidden="true"><svg width="29" height="29" viewBox="0 0 29 29" fill="none"><circle cx="14.5" cy="14.5" r="12.5" stroke="currentColor"/><path d="M8 17.5c2.1-2.4 4.1-3.4 6.4-3.4 2.4 0 4.3 1.1 6.6 3.4M10 10.5h.01M19 10.5h.01" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg></div>
                  <p>Economic efficiency and the protection of human dignity can be designed into the same system.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="paper-section" id="actuarial" aria-labelledby="title-actuarial" data-testid="section-actuarial">
            <div className="section-grid">
              <aside className="section-meta"><div className="section-no">SECTION 02</div><p>Risk modeling<br />&amp; externalities</p></aside>
              <div className="section-body">
                <h2 id="title-actuarial">The Actuarial Problem and <span className="accent">Macroeconomic Risk Modeling</span></h2>
                <div className="prose">
                  <p>Traditional financial models often fail to capture the true cost of period poverty because they overlook indirect economic externalities. From an actuarial perspective, the risk of price volatility in inelastic goods can be mathematically modeled to demonstrate long-term societal liabilities. Actuarial risk modeling can be utilized to calculate the “Absenteeism Cost”—the quantifiable loss in human capital and future GDP when girls miss school or women miss work due to financial exclusion.</p>
                  <p>By utilizing predictive analytics, actuaries can project future public healthcare expenditures driven by the use of unsafe, improvised alternatives. This paper establishes a predictive model proving that if governments or institutional underwriters absorb the initial cost of eliminating the Pink Tax and subsidizing hygiene products today, the long-term return on investment (ROI) is substantially positive due to minimized public health burdens and maximized female labor force participation. Furthermore, actuarial data-mapping can optimize supply chains by analyzing demographic densities to forecast regional demand fluctuations before shortages happen.</p>
                </div>

                <div className="calculator" data-testid="calculator-panel">
                  <div className="calculator-top">
                    <div><div className="formula-label">Interactive model · annual cohort</div><h3>Make the assumptions visible</h3></div>
                    <span className="illustrative-tag">Illustrative simulation · not empirical</span>
                  </div>
                  <div className="calc-controls">
                    <label>
                      <span className="range-head"><span>Annual inflation rate</span><strong data-testid="value-inflation">{inflation.toFixed(1)}%</strong></span>
                      <input aria-label="Illustrative annual inflation rate" type="range" min="0" max="20" step="0.1" value={inflation} onChange={(event) => setInflation(Number(event.target.value))} data-testid="input-inflation" />
                      <span className="range-foot"><span>0%</span><span>20%</span></span>
                    </label>
                    <label>
                      <span className="range-head"><span>Absenteeism among cohort</span><strong data-testid="value-absenteeism">{absenteeism}%</strong></span>
                      <input aria-label="Illustrative absenteeism rate" type="range" min="0" max="30" step="1" value={absenteeism} onChange={(event) => setAbsenteeism(Number(event.target.value))} data-testid="input-absenteeism" />
                      <span className="range-foot"><span>0%</span><span>30%</span></span>
                    </label>
                  </div>
                  <div className="calc-results" aria-live="polite" data-testid="calculator-results">
                    <div className="result">
                      <div className="result-label">Conceptual absenteeism cost</div>
                      <div className="result-value" data-testid="value-gdp-loss">{money(model.absenteeismCost)}</div>
                      <div className="result-sub">annual output proxy for the assumed cohort</div>
                    </div>
                    <div className="result">
                      <div className="result-label">Illustrative subsidy outlay</div>
                      <div className="result-value" data-testid="value-subsidy">{money(model.annualSubsidy)}</div>
                      <div className="result-sub">modeled annual 50% subsidy on inflation premium</div>
                    </div>
                    <div className="result">
                      <div className="result-label">Modeled net ROI</div>
                      <div className="result-value rose" data-testid="value-roi">{model.roi.toFixed(1)}%</div>
                      <div className="result-sub">benefit vs. outlay: {money(model.modeledBenefit)} total modeled benefit</div>
                    </div>
                  </div>
                  <div className="assumptions"><strong>Transparent assumptions—not observed evidence:</strong> cohort of 10,000; baseline product spend $8/month; subsidy covers 50% of the inflation premium for 12 months; three absence days per affected person/year; $115 output proxy per day; model attributes 65% of absenteeism cost and 35% of subsidy outlay as avoided benefit. Net ROI = (modeled benefit − subsidy outlay) ÷ subsidy outlay. The essay provides no quantified dataset; outputs are conceptual and do not establish real-world GDP loss, causal impact, or investment performance.</div>
                </div>
              </div>
            </div>
          </section>

          <section className="paper-section" id="offline-fintech" aria-labelledby="title-offline" data-testid="section-offline-fintech">
            <div className="section-grid">
              <aside className="section-meta"><div className="section-no">SECTION 03</div><p>Accessible rails<br />without internet</p></aside>
              <div className="section-body">
                <h2 id="title-offline">Overcoming the Digital Divide: <span className="accent">Offline FinTech Infrastructure</span></h2>
                <div className="prose">
                  <p>A significant barrier to implementing financial technology in highly vulnerable or developing regions is the Digital Divide—the lack of stable internet access, smartphones, and digital literacy. To ensure true financial inclusion, the proposed framework bypasses conventional smartphone applications in favor of an offline digital ecosystem operating through two primary components:</p>
                  <p><strong>USSD (Unstructured Supplementary Service Data) Protocol:</strong> Operating on basic legacy mobile networks without internet, users dial a simple, free text-based short code (e.g., *123#). This secure interface connects to a ledger that handles tokenized digital vouchers and handles micro-payments.</p>
                  <p><strong>Offline Contactless Smart Cards:</strong> Distributed to registered users, these physical cards are pre-loaded with digital subsidies that automatically strip away the Pink Tax at the point of sale. Merchants utilize low-power point-of-sale (POS) devices that process transactions offline and sync data at the end of the operating day.</p>
                  <p>Through this infrastructure, users pay a tiny, fixed monthly micro-insurance premium via their basic mobile airtime balance. This serves as a micro-hedging mechanism, protecting low-income consumers from market inflation by keeping their costs predictable and constant, regardless of global supply chain shocks.</p>
                </div>
                <div className="flow-wrap">
                  <div className="flow-heading"><h3>A transaction, without a signal</h3><span>Choose a stage to inspect its role</span></div>
                  <div className="flow-steps" role="group" aria-label="Offline financial system steps">
                    {flowSteps.map((step, index) => (
                      <button type="button" key={step.title} onClick={() => setActiveStep(index)}
                        className={`flow-step${activeStep === index ? ' selected' : ''}`}
                        aria-pressed={activeStep === index} data-testid={`button-flow-step-${index + 1}`}>
                        <span className="step-top"><span>0{index + 1}</span><span className="step-icon" aria-hidden="true">{index === 0 ? '⌁' : index === 1 ? '◇' : index === 2 ? '▤' : '→'}</span></span>
                        <strong>{step.title}</strong><small>{step.eyebrow}</small>
                      </button>
                    ))}
                  </div>
                  <div className="flow-explanation" aria-live="polite" data-testid="flow-explanation">
                    <strong>{flowSteps[activeStep].title} — </strong>{flowSteps[activeStep].detail}
                  </div>
                </div>
                <div className="comparison">
                  <div className="comparison-top"><h3>Operational &amp; Financial Matrix</h3><span>Complementary instruments, distinct roles</span></div>
                  <div className="table-scroll">
                    <table className="matrix" data-testid="comparison-table">
                      <thead><tr><th scope="col">Instrument</th><th scope="col">Primary function</th><th scope="col">Operational mechanism</th><th scope="col">Equity contribution</th></tr></thead>
                      <tbody>
                        <tr><td>FinTech</td><td>Access &amp; disbursement</td><td>USSD, tokenized vouchers, offline smart cards, low-power POS</td><td>Works without stable internet or smartphones</td></tr>
                        <tr><td>Actuarial</td><td>Forecast &amp; risk pooling</td><td>Models price volatility, absenteeism cost, health liabilities and regional demand</td><td>Informs stable pricing and anticipates local shortages</td></tr>
                        <tr><td>Tax policy</td><td>Price correction</td><td>Eliminates tax inequities and removes Pink Tax at point of sale</td><td>Reduces state-imposed and market-driven premiums on essentials</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="paper-section" id="scaling" aria-labelledby="title-scaling" data-testid="section-scaling">
            <div className="section-grid">
              <aside className="section-meta"><div className="section-no">SECTION 04</div><p>Community<br />to infrastructure</p></aside>
              <div className="section-body">
                <h2 id="title-scaling">From Grassroots Prototyping to <span className="accent">Public Infrastructure Scaling</span></h2>
                <div className="prose">
                  <p>To evaluate the sociological viability of this decentralized model, a localized, two-tier mutual aid framework is proposed:</p>
                  <p><strong>The Micro-Prototype (School Level):</strong> Traditional aid frameworks rely on “centralized and conditional distribution”—such as restricting hygiene supplies to administrative or supervisors’ offices. This inadvertently creates psychological barriers and reduces accessibility due to social stigma and anxiety. Transitioning toward a decentralized, open-access model via bathroom-installed supply boxes—sustained through peer-to-peer micro-contributions and manual, anonymous ledger tracking—normalizes access and removes institutional gatekeeping.</p>
                  <p><strong>Macro-Level Scaling (Public Infrastructure):</strong> This circular economy model naturally scales to public restrooms, transit hubs, and municipal centers. By integrating these physical supply nodes with our FinTech platform, the system enables Hyper-Local Micro-Crowdfunding. Matured digital wallet users or institutional donors can use the app to geolocate and digitally finance the physical inventory of specific public nodes in economically vulnerable zones, allowing community capital to directly bypass bureaucratic friction.</p>
                </div>
                <div className="two-tier">
                  <article className="tier"><div className="tier-num">01 / MICRO-PROTOTYPE</div><h3>School-level access</h3><p>Open bathroom-installed supply boxes. Peer-to-peer micro-contributions and manual, anonymous ledger tracking reduce social stigma and remove office-based gatekeeping.</p></article>
                  <article className="tier"><div className="tier-num">02 / PUBLIC INFRASTRUCTURE</div><h3>Hyper-local distribution</h3><p>Public restrooms, transit hubs, and municipal centers become supply nodes, with digitally financed inventory directed to economically vulnerable zones.</p></article>
                </div>
                <figure className="system-figure">
                  <figcaption>The proposed financial system</figcaption>
                  <div className="system-line"><strong>1. ACTUARIAL MODEL</strong><span>Forecasts inflation, manages price risks, and stabilizes prices.</span></div>
                  <div className="system-line"><strong>2. OFFLINE FINTECH</strong><span>Disburses tax-free digital vouchers via basic SMS/USSD networks.</span></div>
                  <div className="system-line"><strong>3. CIRCULAR ECONOMY</strong><span>Scales decentralized supply boxes across school and public venues.</span></div>
                </figure>
              </div>
            </div>
          </section>

          <section className="paper-section" id="conclusion" aria-labelledby="title-conclusion" data-testid="section-conclusion">
            <div className="section-grid">
              <aside className="section-meta"><div className="section-no">SECTION 05</div><p>Closing<br />argument</p></aside>
              <div className="section-body">
                <h2 id="title-conclusion">A safety net designed for <span className="accent">dignity.</span></h2>
                <div className="conclusion-panel">
                  <div className="prose">
                    <p>The intersection of Actuarial Science and FinTech offers an unprecedented toolkit to rectify systemic market failures that disproportionately impact women. By transforming financial instruments from mere drivers of corporate profit into shields for human dignity, this framework proves that economic efficiency and social empathy are not mutually exclusive. Implementing decentralized, offline safety nets removes the artificial premium of the Pink Tax, fosters genuine financial inclusion, and unlocks the full macroeconomic potential of half the global population.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="site-shell footer">
        <div className="footer-credit"><span lang="ar" dir="rtl">بحث وكتابة: لين عامر محمد</span>&nbsp; | &nbsp;Research &amp; Writing by: Leen Amer Mohammed</div>
        <div className="footer-mark">Predictive Equity&nbsp; · &nbsp;Research proposal</div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
