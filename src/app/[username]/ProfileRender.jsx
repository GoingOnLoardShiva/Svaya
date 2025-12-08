import TemplateDefault from "./templates/TemplateDefault";
import TemplateNeon from "./templates/TemplateNeon";
import TemplateGlass from "./templates/TemplateGlass";
import TemplateMinimal from "./templates/TemplateMinimal";
import TemplateCreator from "./templates/TemplateCreator";
import TemplateSoftPastel from './templates/TemplateSoftPastel'
import TemplateLuxury from './templates/TemplateLuxury'

const TEMPLATE_MAP = {
  default: {
    component: TemplateDefault,
    premium: false,
  },
  neon: {
    component: TemplateNeon,
    premium: true,
  },
  glass: {
    component: TemplateGlass,
    premium: true,
  },
  minimal: {
    component: TemplateMinimal,
    premium: true,
  },
  creator: {
    component: TemplateCreator,
    premium: true,
  },
  softpastel: {
    component: TemplateSoftPastel,
    premium: true,
  },
  luxury: {
    component: TemplateLuxury,
    premium: true,
  },
};

export default function ProfileRenderer({ user }) {
  if (!user) return null;

  console.log("ACTIVE TEMPLATE →", user.activeTemplateId);
  console.log("PLAN →", user.plan);

  const templateConfig = TEMPLATE_MAP[user.activeTemplateId];

  // Fallback safety
  if (!templateConfig) {
    return <TemplateDefault user={user} />;
  }

  // 🔒 Premium protection
  if (templateConfig.premium && user.plan !== "premium") {
    return <TemplateDefault user={user} />;
  }

  const ActiveTemplate = templateConfig.component;
  return <ActiveTemplate user={user} />;
}

