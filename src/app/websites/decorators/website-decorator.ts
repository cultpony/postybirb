import { WebsiteRegistry } from '../registries/website.registry';
import { GenericLoginDialog } from '../components/generic-login-dialog/generic-login-dialog.component';
import { BaseWebsiteSubmissionForm } from '../components/base-website-submission-form/base-website-submission-form.component';
import { Type } from '@angular/core';
import { Submission } from 'src/app/database/models/submission.model';

export interface WebsiteConfig {
  refreshInterval?: number;     // interval at which the app will check status [default=30 minutes]
  displayedName?: string;        // name value that is displayed in the UI to the user [default=constructor name]
  login: { // login dialog information
    dialog?: any; // dialog component
    url: string;
  };
  components: {
    submissionForm: Type<BaseWebsiteSubmissionForm>,
    journalForm?: Type<BaseWebsiteSubmissionForm>
  };
  validators: {
    submission?: (submission: Submission, formData: any) => string[];
    journal?: (submission: Submission, formData: any) => string[];
  };
  parsers: {
    description: ((html: string) => string)[]; // A list of parsers
    usernameShortcut?: {
      code: string; // e.g. fa -> would parse :falemonynade:
      url: string; // e.g. https://www.furaffinity.net/user/$1
    };
  };
}

export function Website(websiteConfig: WebsiteConfig) {
  if (!websiteConfig.refreshInterval) websiteConfig.refreshInterval = 30 * 60000;
  if (!websiteConfig.login.dialog) websiteConfig.login.dialog = GenericLoginDialog;

  return (target: Function) => {
    if (!websiteConfig.displayedName) websiteConfig.displayedName = target.name;
    WebsiteRegistry.set(target, websiteConfig);
  }
}
