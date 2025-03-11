import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [MatToolbar],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent { }
