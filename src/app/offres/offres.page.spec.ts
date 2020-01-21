import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OffresPage } from './offres.page';

describe('OffresPage', () => {
  let component: OffresPage;
  let fixture: ComponentFixture<OffresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffresPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OffresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
