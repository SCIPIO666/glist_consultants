import type { PortableTextBlock } from "next-sanity";

/**
 * Full text of the client's articles (moved over from their Wix blog), kept as plain data
 * until they are entered in Sanity. Server-side only (used by lib/content.ts).
 *
 * Tiny writing format so the text stays readable here:
 *   ["h2", "Heading"]  ["h3", "Sub-heading"]  ["p", "Paragraph"]
 *   ["ul", ["item", "item"]]   ["ol", ["step", "step"]]
 * Inside text: **bold** and [link text](https://address-or-/page).
 */
type Row = ["h2" | "h3" | "p", string] | ["ul" | "ol", string[]];

let n = 0;
const key = () => `b${++n}`;

function spans(text: string) {
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children: { _key: string; _type: "span"; text: string; marks: string[] }[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  const push = (t: string, marks: string[] = []) => t && children.push({ _key: key(), _type: "span", text: t, marks });
  while ((m = re.exec(text))) {
    push(text.slice(last, m.index));
    if (m[1]) push(m[1], ["strong"]);
    else {
      const k = key();
      markDefs.push({ _key: k, _type: "link", href: m[3] });
      push(m[2], [k]);
    }
    last = m.index + m[0].length;
  }
  push(text.slice(last));
  return { children, markDefs };
}

function toBlocks(rows: Row[]): PortableTextBlock[] {
  const out: PortableTextBlock[] = [];
  for (const [kind, v] of rows) {
    if (kind === "ul" || kind === "ol") {
      for (const item of v as string[]) {
        out.push({ _type: "block", _key: key(), style: "normal", listItem: kind === "ul" ? "bullet" : "number", level: 1, ...spans(item) } as PortableTextBlock);
      }
    } else {
      out.push({ _type: "block", _key: key(), style: kind === "p" ? "normal" : kind, ...spans(v as string) } as PortableTextBlock);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 1. Real estate                                                       */
/* ------------------------------------------------------------------ */
const realEstate: Row[] = [
  ["p", "Investing in real estate can be a lucrative venture, especially in a growing market like Kenya. With the right strategies and insights, you can maximize your returns and make informed decisions that align with local market trends. Here are some essential tips to help you navigate the real estate landscape in Kenya effectively."],
  ["h2", "Understand the Local Market Trends"],
  ["p", "To make informed investment decisions, it’s crucial to stay updated on the latest market trends. Here are some aspects to consider:"],
  ["ul", [
    "**Economic indicators:** Keep an eye on Kenya's economic growth, inflation rates, and employment statistics that can affect property demand.",
    "**Urbanization:** As more people move to urban areas, focus on properties in cities like Nairobi, Mombasa, and Kisumu where demand is rising.",
    "**Infrastructure development:** New roads, schools, and hospitals can increase property values. Monitor government plans for infrastructure projects.",
  ]],
  ["h2", "Choose the Right Property Type"],
  ["p", "Different property types serve various purposes. Consider the following:"],
  ["ul", [
    "**Residential properties:** Apartments and houses are often in high demand, especially in urban centers.",
    "**Commercial properties:** Investing in office spaces or retail shops can yield higher returns, especially in busy areas.",
    "**Land investments:** Buying land in up-and-coming areas can be a smart long-term investment.",
  ]],
  ["h2", "Engage Professional Management Services"],
  ["p", "Managing real estate can be time-consuming and complex. This is where professional management services, like those offered by Glist Consultants, come into play. Their expertise can help you:"],
  ["ul", [
    "**Maximize rental income:** Glist Consultants can assist in setting competitive rental prices and finding reliable tenants.",
    "**Property maintenance:** Regular maintenance ensures your property remains in good condition, attracting and retaining tenants.",
    "**Legal compliance:** They can help navigate the legal landscape to ensure your investments comply with local regulations.",
  ]],
  ["h2", "Network with Local Real Estate Professionals"],
  ["p", "Building relationships with local real estate agents, investors, and developers can provide valuable insights and opportunities. Attend real estate seminars, workshops, and networking events to connect with industry professionals."],
  ["h2", "Utilize Technology and Data Analytics"],
  ["p", "Leverage technology to analyze market trends and property values. Tools and platforms that provide data analytics can help you make informed investment decisions, identify lucrative areas, and track market performance."],
  ["h2", "Contact Glist Consultants"],
  ["p", "For expert advice and management services that can help you navigate the Kenyan real estate market effectively, [reach out to Glist Consultants](/contact?service=property-management). Their team is dedicated to helping you maximize your investments with tailored solutions."],
  ["h2", "Conclusion"],
  ["p", "Maximizing your real estate investments in Kenya requires a strategic approach and a deep understanding of local market dynamics. By utilizing professional management services and staying informed about market trends, you can enhance your investment portfolio and achieve greater financial success."],
];

/* ------------------------------------------------------------------ */
/* 2. Turnover tax                                                      */
/*   REVIEW BEFORE LAUNCH (figures are the client's, kept as written):   */
/*   - eligibility says "up to KES 5 million" and says to move to VAT    */
/*     above KES 5 million. Please confirm both against KRA's current    */
/*     TOT rules (TOT is generally described as KES 1m to 25m a year).   */
/*   - the first rate example adds "housing levy of equivalent amount",  */
/*     which is a separate payroll levy, not part of TOT.                */
/* ------------------------------------------------------------------ */
const turnoverTax: Row[] = [
  ["p", "Turnover tax is a simplified tax regime designed to ease the tax compliance burden for small businesses in Kenya. It offers an alternative to the standard income tax system, allowing eligible businesses to pay tax based on their gross sales rather than profits. This system is particularly beneficial for startups and small enterprises that may not have the resources to maintain detailed accounting records."],
  ["p", "In this article, we will explore the key aspects of turnover tax in Kenya, how it works, who qualifies, and practical steps for compliance. Whether you are a small business owner or an entrepreneur planning to start a business, understanding turnover tax is essential for effective financial planning and legal compliance."],
  ["h2", "What is Turnover Tax Kenya and Who Should Pay It?"],
  ["p", "Turnover tax (TOT) in Kenya is a tax levied on the gross sales or turnover of a business. It is designed to simplify tax administration for small businesses with relatively low annual turnover. Instead of calculating tax on profits, businesses pay a fixed percentage of their total sales."],
  ["h3", "Eligibility Criteria"],
  ["ul", [
    "Businesses with an annual turnover of up to KES 5 million qualify for turnover tax.",
    "The business must not be registered for VAT.",
    "It applies mainly to small and micro enterprises.",
    "Certain sectors such as financial institutions and large-scale manufacturers are excluded.",
  ]],
  ["h3", "Tax Rate"],
  ["p", "The current turnover tax rate is 1.5% of the gross sales. This means if your business generates KES 300,000 in sales monthly, your tax liability will be KES 4,500 plus housing levy of equivalent amount."],
  ["h3", "Benefits of Turnover Tax"],
  ["ul", [
    "**Simplified tax filing:** No need for detailed profit and loss statements.",
    "**Lower compliance costs:** Reduced accounting and audit expenses.",
    "**Predictable tax liability:** Easier to budget for tax payments.",
  ]],
  ["h2", "How to Register and File Turnover Tax in Kenya"],
  ["p", "Registering for turnover tax is a straightforward process that can be done through the Kenya Revenue Authority (KRA) online portal. Here are the steps:"],
  ["ol", [
    "Obtain a Personal Identification Number (PIN) from KRA if you don’t already have one.",
    "Register your business with the relevant county or national authorities.",
    "Log in to the KRA iTax portal and select the turnover tax option.",
    "Submit your application for turnover tax registration.",
    "Once registered, you will receive a certificate confirming your turnover tax status.",
  ]],
  ["h3", "Filing and Payment"],
  ["ul", [
    "Turnover tax is filed monthly using the iTax system.",
    "Payments are due by the 20th of the following month.",
    "You must file even if there is no turnover in a given month.",
    "Keep records of your sales to support your tax returns.",
  ]],
  ["h3", "Penalties for Non-Compliance"],
  ["ul", [
    "Failure to file or pay turnover tax on time attracts penalties and interest.",
    "Persistent non-compliance can lead to audits and legal action.",
  ]],
  ["h2", "Practical Examples of Turnover Tax Calculation"],
  ["p", "Understanding how turnover tax works in practice can help you manage your business finances better. Here are two examples:"],
  ["h3", "Example 1: Small Retail Shop"],
  ["ul", [
    "Annual sales: KES 4,000,000",
    "Turnover tax rate: 1.5%",
    "Annual tax liability: KES 60,000",
    "Monthly tax payment: KES 5,000",
  ]],
  ["p", "The shop owner files monthly returns and pays KES 5,000 each month to KRA."],
  ["h3", "Example 2: Local Food Vendor"],
  ["ul", [
    "Monthly sales: KES 200,000",
    "Turnover tax rate: 1.5%",
    "Monthly tax payment: KES 3,000",
  ]],
  ["p", "The vendor files monthly returns and pays KES 3,000 each month."],
  ["p", "These examples show how turnover tax simplifies tax payments by focusing on sales rather than profits, which can fluctuate."],
  ["h2", "Key Considerations for Businesses Using Turnover Tax"],
  ["p", "While turnover tax offers many advantages, there are important factors to consider:"],
  ["ul", [
    "**Turnover threshold:** If your business exceeds KES 5 million in annual sales, you must register for VAT instead.",
    "**No input VAT claims:** Businesses under turnover tax cannot claim input VAT on purchases.",
    "**Record keeping:** Maintain accurate sales records to support your tax returns.",
    "**Sector restrictions:** Some businesses are not eligible for turnover tax.",
    "**Transitioning to VAT:** If your business grows, plan for the transition to VAT registration and compliance.",
  ]],
  ["h2", "Tips for Managing Turnover Tax Efficiently"],
  ["p", "To make the most of the turnover tax system, consider the following recommendations:"],
  ["ul", [
    "Use accounting software to track sales and generate monthly reports.",
    "Set aside funds monthly to cover your tax payments and avoid cash flow issues.",
    "Stay updated on tax regulations through the KRA website or trusted tax advisors.",
    "[Consult a tax professional](/contact?service=taxation) if you are unsure about your eligibility or filing requirements.",
    "Regularly review your turnover to ensure you remain within the threshold.",
  ]],
  ["h2", "Navigating Tax Compliance for Small Businesses in Kenya"],
  ["p", "Understanding turnover tax is a crucial step for small businesses aiming to comply with Kenyan tax laws while minimizing administrative burdens. By leveraging this simplified tax regime, businesses can focus more on growth and less on complex tax calculations."],
  ["p", "Remember, tax compliance is not just a legal obligation but also a foundation for building a reputable and sustainable business. Stay informed, keep accurate records, and seek professional advice when needed to ensure your business thrives under the turnover tax system."],
  ["p", "This guide aims to empower you with the knowledge to navigate turnover tax in Kenya confidently. Whether you are just starting or managing an existing small business, understanding your tax obligations will help you avoid penalties and optimize your financial planning."],
];

/* ------------------------------------------------------------------ */
/* 3. Payroll                                                           */
/*   REVIEW BEFORE LAUNCH: the three results quoted below (30%, 15%,    */
/*   40%) are in the client's original article. Keep them only if they  */
/*   come from real Glist clients.                                       */
/* ------------------------------------------------------------------ */
const payroll: Row[] = [
  ["p", "Managing payroll can be a complex and time-consuming task for any business. Mistakes in payslips, delays in processing, or missed tax requirements can lead to costly penalties and wasted resources. Glist offers a solution that handles accurate payslips, ensures on-time processing, and meets tax obligations, helping businesses reduce errors, predict labour costs, and reclaim valuable time to focus on growth."],
  ["h2", "Why Payroll Accuracy Matters"],
  ["p", "Payroll accuracy is more than just a compliance issue. It directly affects employee satisfaction and trust. Incorrect payslips can cause frustration and lower morale, while late payments can disrupt employees’ financial planning. For employers, errors can result in fines from tax authorities and damage to the company’s reputation."],
  ["p", "Glist’s system automates payroll calculations, reducing human error. It ensures every payslip reflects the correct hours worked, deductions, and benefits. This accuracy helps businesses avoid costly mistakes and maintain a positive relationship with their workforce."],
  ["h2", "On-Time Payroll Processing to Keep Your Business Running Smoothly"],
  ["p", "Timely payroll processing is essential for smooth business operations. Delays can cause stress for employees and disrupt cash flow management. Glist guarantees on-time payroll processing by automating workflows and integrating with your existing systems."],
  ["p", "For example, a retail company using Glist reported a 30% reduction in payroll processing time. This allowed their HR team to focus on employee engagement and recruitment instead of chasing payroll errors or deadlines."],
  ["h2", "Meeting Tax Requirements Without the Headache"],
  ["p", "Tax compliance is one of the most challenging parts of payroll management. Different regions have varying tax laws, and staying updated can be overwhelming. Glist stays current with tax regulations and automatically applies the correct tax rates and reporting formats."],
  ["p", "This means businesses avoid penalties for late or incorrect tax filings. Glist also generates detailed reports that simplify audits and tax submissions, saving time and reducing stress during tax season."],
  ["h2", "Predict Labour Costs with Confidence"],
  ["p", "Understanding labour costs is crucial for budgeting and strategic planning. Glist provides detailed analytics that help businesses forecast expenses based on accurate payroll data. This insight allows managers to make informed decisions about hiring, scheduling, and salary adjustments."],
  ["p", "For instance, a small manufacturing firm used Glist’s reports to identify overtime trends and adjust shifts accordingly. This led to a 15% reduction in overtime costs within six months."],
  ["h2", "Reclaim Time to Focus on Growing Your Business"],
  ["p", "Payroll management can consume hours each week, especially for small and medium-sized businesses without dedicated payroll staff. By contracting out payroll tasks, Glist frees up time for business owners and HR teams to focus on growth activities such as marketing, customer service, and product development."],
  ["p", "One service provider shared that after switching to Glist, their administrative workload dropped by 40%, allowing them to launch new services and expand their client base."],
  ["h2", "How Glist Supports Your Business Every Step of the Way"],
  ["ul", [
    "Professional expertise.",
    "Timely payroll processing.",
    "Full payroll compliance.",
    "Secure data handling.",
    "Reliable customer support.",
  ]],
  ["p", "These features make Glist a practical choice for businesses looking to simplify payroll without sacrificing accuracy or compliance."],
  ["h2", "Final Thoughts"],
  ["p", "Accurate payroll and compliance are essential for any business aiming to grow sustainably. Glist offers a reliable solution that reduces errors, ensures timely payments, meets tax requirements, and provides valuable labour cost insights. By contracting out payroll processing, businesses can reclaim time and resources to focus on what matters most: expanding their operations and serving their customers better."],
  ["p", "Ready to simplify your payroll? [Talk to us about payroll management](/contact?service=payroll)."],
];

/* ------------------------------------------------------------------ */
/* 4. Saving                                                            */
/*   Insurance products (endowment and education-insurance plans) were  */
/*   left out of this article on purpose: insurance will be a separate  */
/*   business and website.                                              */
/* ------------------------------------------------------------------ */
const saving: Row[] = [
  ["p", "Saving money goes beyond simply setting cash aside. It is a powerful tool that helps you create the life you want for yourself and those you care about. Whether you are a young professional just starting your career, a family planning for the future, or an entrepreneur balancing business growth with personal goals, saving with discipline connects your dreams to reality."],
  ["p", "This guide breaks down practical steps to save for three major milestones: your first car, education, and your first home. Each section offers clear advice tailored to common financial goals in Kenya, helping you build a solid foundation for your future."],
  ["h2", "Saving for Your First Car"],
  ["p", "Owning a car in Kenya represents more than convenience. It signals independence and progress. To make this dream a reality, start with a clear plan."],
  ["h3", "Set a clear target"],
  ["p", "Research the car model you want. Include the total cost: purchase price, insurance, fuel, and maintenance. For example, a reliable used car might cost between KSh 500,000 and KSh 1,000,000 depending on the make and condition."],
  ["h3", "Open a dedicated savings account"],
  ["p", "Keep your car savings separate from your daily spending money. This reduces the temptation to dip into your car fund for other expenses."],
  ["h3", "Use better savings options"],
  ["p", "Consider money market funds. These often offer higher returns than regular savings accounts, helping your money grow faster."],
  ["h3", "Start small and stay consistent"],
  ["p", "Even saving KSh 500 to KSh 1,000 weekly adds up over time. For example, saving KSh 1,000 weekly for a year totals KSh 52,000, which can cover part of your deposit or insurance."],
  ["p", "**Tip:** Buying a reliable used car first can get you on the road sooner. Upgrade to a newer model as your income grows."],
  ["h2", "Saving for Education"],
  ["p", "Education is one of the most valuable investments you can make. Whether for yourself, your children, or your team, planning ahead reduces financial stress."],
  ["h3", "Plan early"],
  ["p", "Tuition fees in Kenya tend to rise every year. Starting your savings early means you spread the cost over time, making it more manageable."],
  ["h3", "Diversify your savings"],
  ["p", "Combine different savings options, such as money market funds and unit trusts. This spreads your risk and can improve your overall returns."],
  ["h3", "Budget beyond tuition"],
  ["p", "Remember to include costs for books, transport, and living expenses. For example, university students may need an additional KSh 20,000 to KSh 30,000 per semester for these extras."],
  ["p", "**Tip:** Entrepreneurs should also set aside funds for short courses or certifications. Continuous learning keeps your skills sharp and your business competitive."],
  ["h2", "Saving for Your First House"],
  ["p", "Owning a home offers security, stability, and a legacy for your family. It requires careful planning and commitment."],
  ["h3", "Define your goal"],
  ["p", "Decide if you want to buy land to build on or purchase a ready-made house. Land prices vary widely depending on location, so research carefully."],
  ["h3", "Understand mortgage options"],
  ["p", "Kenyan banks and SACCOs offer mortgage products, usually requiring a deposit of 10 to 20 percent of the property value. For example, a KSh 5 million home might need a deposit of KSh 500,000 to KSh 1 million."],
  ["h3", "Automate your savings"],
  ["p", "Set up standing orders to transfer a fixed amount to your savings account regularly. This builds your deposit steadily without relying on willpower."],
  ["h3", "Track your progress"],
  ["p", "Use budgeting apps or spreadsheets to monitor your savings and adjust as needed."],
  ["p", "Saving money is a journey that requires patience and discipline. By setting clear goals, choosing the right savings tools, and staying consistent, you can turn your dreams into reality. Start today by identifying your priority and taking the first step toward building the life you envision."],
  ["p", "Want help turning a goal into a savings plan? [Talk to us about personal financial advisory](/contact?service=financial-advisory)."],
];

export const articleBodies: Record<string, PortableTextBlock[]> = {
  "maximize-your-real-estate-investments-in-kenya": toBlocks(realEstate),
  "understanding-turnover-tax-kenya-a-comprehensive-guide-for-businesses": toBlocks(turnoverTax),
  "simplify-payroll-compliance-and-boost-business-growth-with-glists-accurate-solutions": toBlocks(payroll),
  "mastering-the-art-of-saving-building-your-dream-life-with-financial-discipline": toBlocks(saving),
};
